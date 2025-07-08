const { getKakaoToken, getKakaoUserInfo } = require('../services/kakaoAuth.service');
const User = require('../models/user.model');
const { generateToken } = require('../utils/jwt');

exports.loginWithKakao = (req, res) => {
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}`;
    res.redirect(kakaoURL);
};

exports.handleKakaoCallback = async (req, res) => {
    const { code } = req.query;

    try {
        const tokenData = await getKakaoToken(code);
        const kakaoData = await getKakaoUserInfo(tokenData.access_token);

        const kakaoId = kakaoData.id;
        const nickname = kakaoData.kakao_account.profile.nickname;
        const profileImage = kakaoData.kakao_account.profile.profile_image_url;
        const email = kakaoData.kakao_account.email;

        let user = await User.findOne({ kakaoId });
        let isNew = false;

        if (!user) {
            isNew = true;
            // 🔥 DB 저장하지 않음, 대신 user 객체만 임시 구성
            user = await User.create({
                provider: 'kakao',
                kakaoId,
                nickname,
                profileImage,
            });
        }

        // ✅ 신규일 경우에도 kakaoId 기반으로 토큰 발급 (DB 저장 전)
        const token = generateToken({
            id: kakaoId.toString(),
            nickname: user.nickname,
            provider: 'kakao',
            isNew,
        });

        console.log('✅ 카카오 로그인 성공:', { id: user._id, nickname: user.nickname });
        console.log('토큰 생성:', token);

        const redirectUrl = isNew
            ? `${process.env.NEW_USER_REDIRECT}?token=${token}`
            : `${process.env.EXISTING_USER_REDIRECT}?token=${token}`;

        res.redirect(redirectUrl);
    } catch (err) {
        console.error('❌ 카카오 로그인 실패:', err.message);
        res.status(500).send('로그인 처리 실패');
    }
};
