const express = require('express');
const router = express.Router();
const kakaoController = require('../controllers/kakao.controller');
const naverController = require('../controllers/naver.controller');
const indexController = require('../controllers/index.controller');

/**
 * @swagger
 * /api/auth/kakao:
 *   get:
 *     summary: 카카오 OAuth 로그인 시작
 *     tags:
 *       - Auth
 *     description: 사용자를 카카오 로그인 페이지로 리디렉트합니다.
 *     responses:
 *       302:
 *         description: 카카오 로그인 페이지로 리디렉션
 */
router.get('/kakao', kakaoController.loginWithKakao);

/**
 * @swagger
 * /api/auth/kakao/callback:
 *   get:
 *     summary: 카카오 OAuth 콜백 처리
 *     tags:
 *       - Auth
 *     description: 카카오 OAuth 인증 후 사용자 정보를 받아 처리하고 토큰을 발급합니다.
 *     parameters:
 *       - name: code
 *         in: query
 *         required: true
 *         description: 카카오에서 전달하는 인증 코드
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: 프론트엔드로 토큰과 함께 리디렉트
 *       500:
 *         description: 로그인 처리 실패
 */
router.get('/kakao/callback', kakaoController.handleKakaoCallback);

/**
 * @swagger
 * /api/auth/naver:
 *   get:
 *     summary: 네이버 OAuth 로그인 시작
 *     tags:
 *       - Auth
 *     description: 사용자를 네이버 로그인 페이지로 리디렉트합니다.
 *     responses:
 *       302:
 *         description: 네이버 로그인 페이지로 리디렉션
 */
router.get('/naver', naverController.loginWithNaver);

/**
 * @swagger
 * /api/auth/naver/callback:
 *   get:
 *     summary: 네이버 OAuth 콜백 처리
 *     tags:
 *       - Auth
 *     description: 네이버 OAuth 인증 후 사용자 정보를 받아 처리하고 토큰을 발급합니다.
 *     parameters:
 *       - name: code
 *         in: query
 *         required: true
 *         description: 네이버에서 전달하는 인증 코드
 *         schema:
 *           type: string
 *       - name: state
 *         in: query
 *         required: true
 *         description: CSRF 방지를 위한 상태 토큰
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: 프론트엔드로 토큰과 함께 리디렉트
 *       500:
 *         description: 인증 처리 실패
 */
router.get('/naver/callback', naverController.handleNaverCallback);

/**
 * @swagger
 * /api/auth/complete-profile:
 *   post:
 *     summary: 온보딩 프로필 저장
 *     description: JWT 토큰을 사용해 OAuth 사용자에게 지갑 주소를 등록합니다.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - walletAddress
 *             properties:
 *               walletAddress:
 *                 type: string
 *                 example: "0x1234567890abcdef..."
 *     responses:
 *       200:
 *         description: 저장 성공
 *       400:
 *         description: 지갑 주소 누락
 *       401:
 *         description: 인증 토큰 없음
 *       404:
 *         description: 사용자 없음
 *       500:
 *         description: 서버 에러
 */
router.post('/complete-profile', indexController.completeProfile);




module.exports = router;
