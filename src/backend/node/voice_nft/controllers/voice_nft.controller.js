// src/backend/node/voice_nft/controllers/voice_nft.controller.js
const voiceNFTService = require('../services/voice_nft.service'); // 서비스 파일 경로

class VoiceNFTController {
    // NFT 목록 조회 및 검색/필터링 API (GET /api/voice-nfts)
    async getNFTs(req, res) {
        try {
            // 쿼리 파라미터 추출
            const { keyword, tags, minPrice, maxPrice, sortBy, sortOrder } = req.query;

            const nfts = await voiceNFTService.getVoiceNFTs({
                keyword,
                tags, // 서비스에서 배열 변환 처리
                minPrice: minPrice ? parseFloat(minPrice) : undefined, // 숫자로 변환
                maxPrice: maxPrice ? parseFloat(maxPrice) : undefined, // 숫자로 변환
                sortBy,
                sortOrder
            });
            res.status(200).json(nfts);
        } catch (error) {
            res.status(500).json({ message: error.message || 'NFT 검색/조회 실패' });
        }
    }
}

module.exports = new VoiceNFTController();