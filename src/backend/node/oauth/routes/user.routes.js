const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');


/**
 * @swagger
 * /api/user/profile:
 *   post:
 *     summary: 사용자 프로필 및 NFT 정보 조회
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithNFTResponse'
 *       401:
 *         description: 인증 토큰 없음
 */

router.post('/profile', userController.getProfile);

module.exports = router;