// src/backend/node/voice_nft/routes/voice_nft.routes.js
const express = require('express');
const voiceNFTController = require('../controllers/voice_nft.controller'); // 컨트롤러 파일 경로
const router = express.Router();

/**
 * @swagger
 * /api/voice-nfts:
 *   get:
 *     summary: Voice NFT 목록 조회
 *     tags:
 *       - VoiceNFT
 *     description: 필터링, 정렬, 키워드 검색을 포함한 NFT 목록을 조회합니다.
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: 제목/설명 키워드 검색
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *         description: 쉼표로 구분된 태그들 (예: music,funny)
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: 최소 가격
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: 최대 가격
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [mint_date, likes_count, price]
 *         description: 정렬 기준
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: 정렬 방향
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/VoiceNFT'
 *       500:
 *         description: NFT 검색/조회 실패
 */
router.get('/', voiceNFTController.getNFTs);

module.exports = router;