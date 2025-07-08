const axios = require('axios');
const User = require('../models/User.model');
const { generateToken } = require('../utils/jwt');

// ✅ Naver OAuth 로그인 시작
exports.loginWithNaver = (req, res) => {
    const state = Math.random().toString(36).substring(2);
    const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NAVER_CLIENT_ID}&redirect_uri=${process.env.NAVER_CALLBACK_URL}&state=${state}`;
    res.redirect(url);
};

// ✅ Naver OAuth 콜백 처리
exports.handleNaverCallback = async (req, res) => {
    const { code, state } = req.query;

    try {
        const tokenRes = await axios.get('https://nid.naver.com/oauth2.0/token', {
            params: {
                grant_type: 'authorization_code',
                client_id: process.env.NAVER_CLIENT_ID,
                client_secret: process.env.NAVER_CLIENT_SECRET,
                code,
                state,
            },
        });

        const accessToken = tokenRes.data.access_token;

        const profileRes = await axios.get('https://openapi.naver.com/v1/nid/me', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        const profile = profileRes.data.response;
        const { id, email, nickname, profile_image } = profile;

        const existingUser = await User.findOne({ naverId: id });
        let isNew = false;
        let user;

        if (!existingUser) {
            isNew = true;
            user = { _id: id, nickname, email, profileImage: profile_image };
        } else {
            user = existingUser;
        }

        const token = generateToken({ id: user._id, nickname: user.nickname, isNew });

        const redirectUrl = isNew
            ? `${process.env.NEW_USER_REDIRECT}?token=${token}`
            : `${process.env.EXISTING_USER_REDIRECT}?token=${token}`;

        res.redirect(redirectUrl);
    } catch (err) {
        console.error('❌ 네이버 로그인 실패:', err.message);
        res.status(500).send('Naver login failed');
    }
};