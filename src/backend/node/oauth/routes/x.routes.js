const express = require('express');
const router = express.Router();
const { handleOAuthCallback } = require('../controllers/auth.controller');
const { authenticateOAuth } = require('../middlewares/passportAuth');
const passport = require('passport');

router.get('/', passport.authenticate('x', {
    scope: ['users.read', 'tweet.read']
}));

router.get('/callback', authenticateOAuth('x'), handleOAuthCallback);

module.exports = router;
