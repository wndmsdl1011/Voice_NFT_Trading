const express = require('express');
const router = express.Router();

const nftController = require('../controllers/nft.controller');

// NFT 민팅 라우트
router.post('/mint', nftController.mintNFT);

// 반드시 export 해줘야 외부에서 사용 가능
module.exports = router;