const { getKakaoToken, getKakaoUserInfo } = require('../services/kakaoAuth.service');
const User = require('../models/User.model');
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
        const provider = decoded.provider;
        const { walletAddress } = req.body;

        if (!walletAddress) {
            return res.status(400).json({ error: '지갑 주소가 누락되었습니다.' });
        }

        const existingUser = await User.findOne({ [`${provider}Id`]: userId });

        if (!existingUser) {
            return res.status(404).json({ error: '사용자 없음' });
        }

        existingUser.walletAddress = walletAddress;
        await existingUser.save();

        const newToken = jwt.sign(
            { id: existingUser._id, nickname: existingUser.nickname },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ success: true, token: newToken, user: existingUser });
    } catch (err) {
        console.error('❌ 프로필 저장 실패:', err.message);
        res.status(500).json({ error: '프로필 저장 실패' });
    }
};

