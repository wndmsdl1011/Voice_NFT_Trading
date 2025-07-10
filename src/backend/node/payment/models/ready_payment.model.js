const mongoose = require('mongoose');

const ReadyPaymentSchema = new mongoose.Schema({
    tid: {
        type: String,
        required: true,
        unique: true
    },
    tokenId: {
        type: String,
        required: true
    },
    sellerWallet: {
        type: String,
        required: true
    },
    price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ReadyPayment', ReadyPaymentSchema);
