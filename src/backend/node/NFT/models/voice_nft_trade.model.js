// models/voice_nft_trade.model.js
const mongoose = require('mongoose');

const VoiceNFTTradeSchema = new mongoose.Schema({
    tokenId: {
        type: String,
        required: true,
        index: true
    },
    sellerWallet: {
        type: String,
        required: true
    },
    buyerWallet: {
        type: String,
        required: true,
        index: true
    },
    price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    tradeDate: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('VoiceNFTTrade', VoiceNFTTradeSchema);
