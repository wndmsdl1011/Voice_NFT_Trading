// src/backend/node/voice_nft/routes/voice_nft.routes.js
const express = require('express');
const voiceNFTController = require('../controllers/voice_nft.controller'); // 컨트롤러 파일 경로
const router = express.Router();

// AI 음성 NFT 목록 조회 및 검색/필터링
// 예: GET /api/voice-nfts?keyword=따뜻한&tags=한국어,내레이션&minPrice=0.01&sortBy=mint_date&sortOrder=desc
router.get('/', voiceNFTController.getNFTs);

module.exports = router;