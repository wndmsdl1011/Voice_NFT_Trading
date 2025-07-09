const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

exports.getProfile = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, error: '인증 토큰 없음' });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('🔍 JWT 디코딩 결과:', decoded);
        
        // provider별로 쿼리
        let query = {};
        if (decoded.provider === 'kakao') query.kakaoId = decoded.id;
        else if (decoded.provider === 'naver') query.naverId = decoded.id;
        else if (decoded.provider === 'google') query.googleId = decoded.id;
        else query._id = decoded.id;
        
        console.log('🔍 사용자 조회 쿼리:', query);
        const user = await User.findOne(query);
        
        if (!user) {
            console.log('❌ 사용자를 찾을 수 없음:', query);
            return res.status(404).json({ success: false, error: '사용자 없음' });
        }
        
        console.log('✅ 사용자 조회 성공:', { id: user._id, nickname: user.nickname });
        res.json({ success: true, user });
    } catch (err) {
        console.error('❌ 프로필 조회 실패:', err.message);
        res.status(500).json({ success: false, error: '프로필 조회 실패' });
    }
};