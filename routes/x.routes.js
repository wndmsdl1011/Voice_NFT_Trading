// X 관련 경로만 모아놓은 파일

const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth.controller');

// GET /api/auth/x -> X 로그인 시작
router.get('/', passport.authenticate('x', { scope: ['users.read', 'tweet.read'] }));

// GET /api/auth/x/callback -> X 로그인 후 콜백 처리
router.get('/callback', authController.handleXCallback);

module.exports = router;