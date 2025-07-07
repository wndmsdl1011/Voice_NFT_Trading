const express = require('express');
const router = express.Router();
const { handleOAuthCallback, completeProfile } = require('../controllers/auth.controller');
const { authenticateOAuth } = require('../middlewares/passportAuth');
const passport = require('passport');

// 페이스북 로그인 시작
router.get('/', passport.authenticate('facebook', { scope: ['public_profile', 'user_link'] }));
router.get('/callback', authenticateOAuth('facebook'), handleOAuthCallback);
router.post('/complete-profile', completeProfile);

module.exports = router;
