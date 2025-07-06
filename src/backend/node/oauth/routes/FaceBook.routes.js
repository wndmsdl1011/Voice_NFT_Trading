const express = require('express');
const router = express.Router();
const { handleOAuthCallback } = require('../controllers/auth.controller');
const { authenticateOAuth } = require('../middlewares/passportAuth');
const passport = require('passport');

// 페이스북 로그인 시작
router.get('/', passport.authenticate('facebook', { scope: ['public_profile'] }));
router.get('/callback', authenticateOAuth('facebook'), handleOAuthCallback);


module.exports = router;
