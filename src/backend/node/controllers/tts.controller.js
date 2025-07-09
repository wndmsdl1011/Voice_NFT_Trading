const ttsService = require("../services/tts.service");

// 음성 파일 업로드 및 학습
exports.uploadVoice = async (req, res) => {
  try {
    // FormData에서 user_id 추출
    const userId = req.body.user_id || req.user?.id;
    const audioFile = req.file;

    console.log("받은 요청 데이터:", {
      userId,
      file: audioFile
        ? {
            originalname: audioFile.originalname,
            mimetype: audioFile.mimetype,
            size: audioFile.size,
          }
        : null,
      body: req.body,
      headers: req.headers,
    });

    if (!audioFile) {
      return res.status(400).json({
        error: "음성 파일이 필요합니다.",
      });
    }

    if (!userId) {
      return res.status(400).json({
        error: "사용자 ID가 필요합니다.",
      });
    }

    console.log(`[${userId}] 음성 파일 업로드 시작:`, audioFile.originalname);

    // Flask 서버로 음성 파일 전송
    const result = await ttsService.uploadVoiceToFlask(userId, audioFile);

    res.json({
      success: true,
      message: "음성 파일이 성공적으로 업로드되었습니다.",
      data: result,
    });
  } catch (error) {
    console.error("음성 업로드 오류:", error);
    res.status(500).json({
      error: error.message || "음성 업로드 중 오류가 발생했습니다.",
    });
  }
};

// TTS 음성 생성
exports.generateSpeech = async (req, res) => {
  try {
    const { userId, text } = req.body;

    if (!userId || !text) {
      return res.status(400).json({
        error: "userId와 text는 필수입니다.",
      });
    }

    console.log(`[${userId}] TTS 생성 요청:`, text.substring(0, 50) + "...");

    // Flask 서버로 TTS 생성 요청
    const audioBuffer = await ttsService.generateSpeechFromFlask(userId, text);

    // 오디오 파일을 클라이언트에 전송
    res.set({
      "Content-Type": "audio/wav",
      "Content-Disposition": 'attachment; filename="generated_speech.wav"',
    });

    res.send(audioBuffer);
  } catch (error) {
    console.error("TTS 생성 오류:", error);
    res.status(500).json({
      error: error.message || "TTS 생성 중 오류가 발생했습니다.",
    });
  }
};

// 사용자 음성 모델 상태 확인
exports.getVoiceStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        error: "사용자 ID가 필요합니다.",
      });
    }

    const status = await ttsService.checkVoiceStatus(userId);

    res.json({
      success: true,
      data: status,
    });
  } catch (error) {
    console.error("음성 상태 확인 오류:", error);
    res.status(500).json({
      error: error.message || "음성 상태 확인 중 오류가 발생했습니다.",
    });
  }
};
