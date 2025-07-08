const express = require('express');
const router = express.Router();

const nftController = require('../controllers/nft.controller');

router.post('/mint', nftController.mintNFT);