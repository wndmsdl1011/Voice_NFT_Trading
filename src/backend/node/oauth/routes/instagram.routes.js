const express = require('express');
const router = express.Router();
const { handleOAuthCallback } = require('../controllers/auth.controller');
const { authenticateOAuth } = require('../middlewares/passportAuth');
const passport = require('passport');

// 인스타그램 로그인 시작
router.get('/', passport.authenticate('instagram'));

// 콜백
router.get('/callback', authenticateOAuth('instagram'), handleOAuthCallback);

module.exports = router;
