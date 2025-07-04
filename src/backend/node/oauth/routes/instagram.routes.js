// 인스타그램 관련 경로만 모아놓은 파일

const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth.controller');

// GET /api/auth/instagram  -> 인스타그램 로그인 시작
router.get('/', passport.authenticate('instagram'));

// GET /api/auth/instagram/callback -> 인스타그램 로그인 후 콜백 처리
router.get('/callback', authController.handleInstagramCallback);

module.exports = router;