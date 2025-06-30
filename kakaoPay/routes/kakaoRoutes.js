const express = require('express');
const router = express.Router();
const kakaoController = require('../controllers/payController');

router.post('/pay', kakaoController.requestPayment);
router.get('/success', kakaoController.approvePayment); // 결제 완료 콜백

module.exports = router;
