const express = require('express');
const router = express.Router();
const { mintNFT, saveNFT,getNFTList } = require('../controllers/nft.controller');
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
router.post('/save', saveNFT);
router.get('/list', getNFTList);

// 반드시 export 해줘야 외부에서 사용 가능
module.exports = router;
