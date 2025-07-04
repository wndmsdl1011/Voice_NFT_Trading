// 모든 라우터를 모아서 통합하고, 공통 엔드포인트를 관리

const express = require('express');
const router = express.Router();
const instagramRoutes = require('./instagram.routes');
const xRoutes = require('./x.routes');
const authController = require('../controllers/auth.controller');

// /api/auth/instagram 경로로 들어오는 요청은 instagram.routes.js 파일이 처리
router.use('/instagram', instagramRoutes);

// /api/auth/x 경로로 들어오는 요청은 x.routes.js 파일이 처리
router.use('/x', xRoutes);

// /api/auth/complete-instagram -> 인스타그램 최종 가입 API
router.post('/complete-instagram', authController.completeInstagram);

module.exports = router;