const express = require('express');
const router = express.Router();
const kakaoController = require('../controllers/kakao.controller');

router.get('/kakao', kakaoController.loginWithKakao);
router.get('/kakao/callback', kakaoController.handleKakaoCallback);
router.get('/kakao/complete-profile', kakaoController.completeProfile);

module.exports = router;
