const express = require('express');
const router = express.Router();
const kakaoController = require('../controllers/kakao.controller');
const naverController = require('../controllers/naver.controller');
const googleController = require('../controllers/google.controller');
const indexController = require('../controllers/index.controller');

// kakao
router.get('/kakao', kakaoController.loginWithKakao);
router.get('/kakao/callback', kakaoController.handleKakaoCallback);

// Google
router.get('/google', googleController.loginWithGoogle);
router.get('/google/callback', googleController.handleGoogleCallback);

// Naver
router.get('/naver', naverController.loginWithNaver);
router.get('/naver/callback', naverController.handleNaverCallback);

// Index
router.post('/complete-profile', indexController.completeProfile);
module.exports = router;
