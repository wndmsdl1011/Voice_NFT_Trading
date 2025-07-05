const express = require('express');
const router = express.Router();
const instagramRoutes = require('./instagram.routes');

// ✅ X 관련 라우터 제거
// const xRoutes = require('./x.routes');
// const authController = require('../controllers/auth.controller');

// ✅ Instagram 라우터만 사용
router.use('/instagram', instagramRoutes);

module.exports = router;
