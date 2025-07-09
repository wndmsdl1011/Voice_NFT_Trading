const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');


/**
 * @swagger
 * /api/user/profile:
 *   post:
 *     summary: 사용자 프로필 조회
 *     description: JWT 토큰으로 인증된 사용자의 정보를 반환합니다.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: 인증 토큰 없음
 *       404:
 *         description: 사용자 없음
 *       500:
 *         description: 서버 에러
 */
router.post('/profile', userController.getProfile);

module.exports = router;