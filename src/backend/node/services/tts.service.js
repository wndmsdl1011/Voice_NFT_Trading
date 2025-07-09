const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");

const FLASK_SERVER_URL = process.env.FLASK_TTS_URL || "http://localhost:5000";

class TTSService {
  // M4A 파일을 WAV로 변환
  async convertToWav(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
      console.log(`FFmpeg 변환 시작: ${inputPath} -> ${outputPath}`);

      ffmpeg(inputPath)
        .toFormat("wav")
        .audioChannels(1) // 모노 채널로 변환
        .audioFrequency(16000) // 16kHz 샘플링 레이트
        .on("start", (commandLine) => {
          console.log("FFmpeg 명령:", commandLine);
        })
        .on("end", () => {
          console.log(`FFmpeg 변환 완료: ${outputPath}`);
          resolve(outputPath);
        })
        .on("error", (err) => {
          console.error("FFmpeg 오류:", err);
          reject(err);
        })
        .save(outputPath);
    });
  }

  // Flask 서버로 음성 파일 업로드
  async uploadVoiceToFlask(userId, audioFile) {
    let finalFilePath = audioFile.path;
    let finalFilename = audioFile.originalname;
    let finalMimetype = audioFile.mimetype;

    try {
      // M4A 파일인 경우 WAV로 변환
      if (
        audioFile.mimetype === "audio/x-m4a" ||
        audioFile.originalname.toLowerCase().endsWith(".m4a")
      ) {
        // 안전한 파일명 생성 (특수문자, 공백 제거)
        const timestamp = Date.now();
        const safeFilename = `${userId}_${timestamp}`;
        const uploadDir = path.dirname(audioFile.path);
        const cleanPath = path.join(uploadDir, `${safeFilename}.m4a`);
        const wavPath = path.join(uploadDir, `${safeFilename}.wav`);

        console.log(
          `M4A 파일 변환 시작: ${audioFile.originalname} -> ${safeFilename}.wav`
        );

        try {
          // 원본 파일 경로에도 공백이 있을 수 있으므로 cleanPath 사용
          if (cleanPath !== audioFile.path) {
            // 파일명에 공백이 있는 경우 새로운 경로로 파일 복사
            fs.copyFileSync(audioFile.path, cleanPath);
          }

          await this.convertToWav(cleanPath, wavPath);

          // 원본 M4A 파일들 삭제
          if (fs.existsSync(audioFile.path)) {
            fs.unlinkSync(audioFile.path);
          }
          if (cleanPath !== audioFile.path && fs.existsSync(cleanPath)) {
            fs.unlinkSync(cleanPath);
          }

          // 변환된 파일 정보 업데이트
          finalFilePath = wavPath;
          finalFilename = audioFile.originalname.replace(/\.m4a$/i, ".wav");
          finalMimetype = "audio/wav";

          console.log(`M4A 변환 완료: ${finalFilename}`);
        } catch (convertError) {
          console.error("M4A 변환 실패:", convertError);
          throw new Error(
            "M4A 파일 변환에 실패했습니다. FFmpeg이 설치되어 있는지 확인해주세요."
          );
        }
      }

      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("prompt_speech", fs.createReadStream(finalFilePath), {
        filename: finalFilename,
        contentType: finalMimetype,
      });

      const response = await axios.post(
        `${FLASK_SERVER_URL}/upload-prompt`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
          timeout: 30000, // 30초 타임아웃
        }
      );

      // 업로드된 파일 삭제
      if (fs.existsSync(finalFilePath)) {
        fs.unlinkSync(finalFilePath);
      }

      return response.data;
    } catch (error) {
      // 업로드 실패 시에도 파일 삭제
      if (fs.existsSync(finalFilePath)) {
        fs.unlinkSync(finalFilePath);
      }
      if (finalFilePath !== audioFile.path && fs.existsSync(audioFile.path)) {
        fs.unlinkSync(audioFile.path);
      }

      if (error.response) {
        throw new Error(error.response.data.error || "Flask 서버 오류");
      } else if (error.code === "ECONNREFUSED") {
        throw new Error(
          "TTS 서버(Flask)에 연결할 수 없습니다. Flask 서버를 시작해주세요: cd src/backend/Spark-TTS-main && python flask_server.py"
        );
      } else {
        console.error("TTS 서비스 상세 오류:", error);
        throw new Error(
          `음성 파일 업로드 중 오류가 발생했습니다: ${error.message}`
        );
      }
    }
  }

  // Flask 서버에서 TTS 음성 생성
  async generateSpeechFromFlask(userId, text) {
    try {
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("text", text);

      const response = await axios.post(
        `${FLASK_SERVER_URL}/voice-clone`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
          responseType: "arraybuffer", // 오디오 파일을 바이너리로 받음
          timeout: 60000, // 60초 타임아웃 (TTS 생성 시간 고려)
        }
      );

      return Buffer.from(response.data);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.toString();
        throw new Error(errorMessage || "TTS 생성 중 오류가 발생했습니다.");
      } else if (error.code === "ECONNREFUSED") {
        throw new Error(
          "TTS 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요."
        );
      } else {
        throw new Error("TTS 생성 중 오류가 발생했습니다.");
      }
    }
  }

  // 사용자 음성 모델 상태 확인
  async checkVoiceStatus(userId) {
    try {
      // Flask 서버에서 사용자 프롬프트 파일 존재 여부 확인
      // 실제로는 Flask 서버에 상태 확인 API를 추가해야 하지만,
      // 현재는 간단히 파일 존재 여부로 판단
      const response = await axios.get(
        `${FLASK_SERVER_URL}/voice-status/${userId}`,
        {
          timeout: 10000,
        }
      );

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return {
          hasVoiceModel: false,
          message: "등록된 음성 모델이 없습니다.",
        };
      }

      return {
        hasVoiceModel: false,
        message: "음성 모델 상태를 확인할 수 없습니다.",
      };
    }
  }

  // Flask 서버 상태 확인
  async checkFlaskServerHealth() {
    try {
      const response = await axios.get(`${FLASK_SERVER_URL}/health`, {
        timeout: 5000,
      });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
}

module.exports = new TTSService();
