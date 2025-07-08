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
            user = { _id: kakaoId, nickname, profileImage, email };
        }

        // ✅ 신규일 경우에도 kakaoId 기반으로 토큰 발급 (DB 저장 전)
        const token = generateToken({ id: user._id, nickname: user.nickname, isNew });

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


exports.completeProfile = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: '인증 토큰 없음' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const { walletAddress, age, job, voiceCategory } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { walletAddress, age, job, voiceCategory },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: '사용자 없음' });
        }

        // 새 JWT 발급 (선택사항)
        const newToken = jwt.sign(
            { id: updatedUser._id, nickname: updatedUser.nickname },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ success: true, token: newToken, user: updatedUser });
    } catch (err) {
        console.error('❌ 프로필 저장 실패:', err.message);
        res.status(500).json({ error: '프로필 저장 실패' });
    }
};