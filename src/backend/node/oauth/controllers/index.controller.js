const { getKakaoToken, getKakaoUserInfo } = require('../services/kakaoAuth.service');
const User = require('../models/user.model');
const { generateToken } = require('../utils/jwt');
const jwt = require('jsonwebtoken');

exports.completeProfile = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: '인증 토큰 없음' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        console.log('✅ 프로필 저장 요청:', { userId, body: req.body });
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