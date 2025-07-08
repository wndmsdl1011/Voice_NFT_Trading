const axios = require('axios');
const User = require('../models/User.model');
const { generateToken } = require('../utils/jwt');

// ✅ Google OAuth 로그인 시작
exports.loginWithGoogle = (req, res) => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_CALLBACK_URL}&scope=profile%20email`;
    res.redirect(url);
};

// ✅ Google OAuth 콜백 처리
exports.handleGoogleCallback = async (req, res) => {
    const { code } = req.query;

    try {
        const tokenRes = await axios.post('https://oauth2.googleapis.com/token', null, {
            params: {
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.GOOGLE_CALLBACK_URL,
                grant_type: 'authorization_code',
            },
        });

        const accessToken = tokenRes.data.access_token;

        const profileRes = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        const { id, email, name, picture } = profileRes.data;

        const existingUser = await User.findOne({ googleId: id });
        let isNew = false;
        let user;

        if (!existingUser) {
            isNew = true;
            user = { _id: id, nickname: name, email, profileImage: picture };
        } else {
            user = existingUser;
        }

        const token = generateToken({ id: user._id, nickname: user.nickname, isNew });

        const redirectUrl = isNew
            ? `${process.env.NEW_USER_REDIRECT}?token=${token}`
            : `${process.env.EXISTING_USER_REDIRECT}?token=${token}`;

        res.redirect(redirectUrl);
    } catch (err) {
        console.error('❌ 구글 로그인 실패:', err.message);
        res.status(500).send('Google login failed');
    }
};