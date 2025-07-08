const axios = require('axios');

exports.getKakaoToken = async (code) => {
    const url = 'https://kauth.kakao.com/oauth/token';
    const payload = {
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_CLIENT_ID,
        redirect_uri: process.env.KAKAO_REDIRECT_URI,
        code,
        client_secret: process.env.KAKAO_CLIENT_SECRET || undefined,
    };

    const response = await axios.post(url, null, {
        params: payload,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    return response.data;
};

exports.getKakaoUserInfo = async (accessToken) => {
    const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return response.data;
};
