const express = require('express');
const router = express.Router();

const nftController = require('../controllers/nft.controller');
const voiceListController = require('../controllers/voiceList.controller');

/**
 * @swagger
 * /api/nft/mint:
 *   post:
 *     summary: 스마트 컨트랙트 배포 및 ABI 복사
 *     tags:
 *       - VoiceNFT
 *     description: Truffle을 통해 스마트 컨트랙트를 재배포하고, ABI 파일을 프론트엔드 경로로 복사합니다.
 *     responses:
 *       200:
 *         description: 배포 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "✅ 자동 배포 및 ABI 복사 완료"
 *                 stdout:
 *                   type: string
 *                   example: "Compiling your contracts...\n...\n"
 *       500:
 *         description: 배포 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "배포 실패"
 *                 details:
 *                   type: string
 *                   example: "Error: ENOENT: no such file or directory, ..."
 */
router.post('/mint', nftController.mintNFT);

<<<<<<< HEAD
// 반드시 export 해줘야 외부에서 사용 가능
module.exports = router;
=======
/**
 * @swagger
 * /api/nft/voiceList:
 *   get:
 *     summary: Voice NFT 목록 조회
 *     tags:
 *       - VoiceNFT
 *     description: "필터링, 정렬, 키워드 검색을 포함한 NFT 목록을 조회합니다."
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: "제목/설명 키워드 검색"
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *         description: "쉼표로 구분된 태그들 (예: music,funny)"
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: "최소 가격"
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: "최대 가격"
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [mint_date, likes_count, price]
 *         description: "정렬 기준"
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: "정렬 방향"
 *     responses:
 *       200:
 *         description: "성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/VoiceNFT'
 *       500:
 *         description: "NFT 검색/조회 실패"
 */
router.get('/voiceList', voiceListController.getNFTs);


module.exports = router;
>>>>>>> a27f7e63f15103c0934ef4d811d9564eef14cf4f
