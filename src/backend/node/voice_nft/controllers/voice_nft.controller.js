// src/backend/node/voice_nft/controllers/voice_nft.controller.js
const voiceNFTService = require('../services/voice_nft.service'); // 서비스 파일 경로


exports.getNFTs = async (req, res) => {
    try {
        // 쿼리 파라미터 추출
        const { keyword, tags, minPrice, maxPrice, sortBy, sortOrder } = req.query;

        // 서비스 계층의 함수 호출
        const nfts = await voiceNFTService.getVoiceNFTs({
            keyword,
            tags,
            minPrice: minPrice ? parseFloat(minPrice) : undefined, // 숫자로 변환
            maxPrice: maxPrice ? parseFloat(maxPrice) : undefined, // 숫자로 변환
            sortBy,
            sortOrder
        });

        // 성공 응답 전송
        res.status(200).json(nfts);
    } catch (error) {
        // 에러 발생 시 응답 전송
        console.error("NFT 검색/조회 실패:", error); // 서버 로그에 에러 기록
        res.status(500).json({ message: error.message || 'NFT 검색/조회 실패' });
    }
};