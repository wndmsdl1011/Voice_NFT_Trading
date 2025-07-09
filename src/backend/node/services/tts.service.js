const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const FLASK_SERVER_URL = process.env.FLASK_TTS_URL || "http://localhost:5000";

class TTSService {
  // Flask 서버로 음성 파일 업로드
  async uploadVoiceToFlask(userId, audioFile) {
    try {
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("prompt_speech", fs.createReadStream(audioFile.path), {
        filename: audioFile.originalname,
        contentType: audioFile.mimetype,
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
      fs.unlinkSync(audioFile.path);

      return response.data;
    } catch (error) {
      // 업로드 실패 시에도 파일 삭제
      if (fs.existsSync(audioFile.path)) {
        fs.unlinkSync(audioFile.path);
      }

      if (error.response) {
        throw new Error(error.response.data.error || "Flask 서버 오류");
      } else if (error.code === "ECONNREFUSED") {
        throw new Error(
          "TTS 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요."
        );
      } else {
        throw new Error("음성 파일 업로드 중 오류가 발생했습니다.");
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
