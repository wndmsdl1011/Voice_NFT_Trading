const express = require("express");
const router = express.Router();
const ttsController = require("../controllers/tts.controller");
const multer = require("multer");

// 파일 업로드 설정
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB 제한
  },
});

// 음성 파일 업로드 및 학습
router.post("/upload-voice", upload.single("audio"), ttsController.uploadVoice);

// TTS 음성 생성
router.post("/generate-speech", ttsController.generateSpeech);

// 사용자 음성 모델 상태 확인
router.get("/voice-status/:userId", ttsController.getVoiceStatus);

module.exports = router;
