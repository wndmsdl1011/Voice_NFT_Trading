const { getKakaoToken, getKakaoUserInfo } = require('../services/kakaoAuth.service');
const User = require('../models/User.model');
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

        let user = await User.findOne({ kakaoId });
        let isNew = false;

        if (!user) {
            isNew = true;
            console.log('[카카오 회원가입] 신규 사용자 DB 저장 시도:', { kakaoId, nickname, profileImage });
            // DB에 신규 사용자 저장 (이메일 필드 제거)
            user = await User.create({
                provider: 'kakao',
                kakaoId,
                nickname,
                profileImage
            });
            console.log('[카카오 회원가입] DB 저장 완료:', user);
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
        console.error('❌ 카카오 로그인 실패 상세:', err);
        res.status(500).send('로그인 처리 실패');
    }
};