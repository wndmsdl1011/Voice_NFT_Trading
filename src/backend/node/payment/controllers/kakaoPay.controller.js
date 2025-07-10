const {
    requestKakaoPayReady,
    requestKakaoPayApprove,
} = require('../services/kakaoPay.service');
const VoiceNFTTrade = require('../../NFT/models/voice_nft_trade.model');
const ReadyPayment = require('../models/ready_payment.model');

exports.kakaoPayReady = async (req, res) => {
    try {
        const { item_name, quantity, total_amount, tokenId, sellerWallet } = req.body;

        const result = await requestKakaoPayReady({ item_name, quantity, total_amount });

        // 💾 DB에 tid-tokenId-sellerWallet-price 저장
        await ReadyPayment.create({
            tid: result.tid,
            tokenId,
            sellerWallet,
            price: total_amount
        });

        res.json({
            next_redirect_pc_url: result.next_redirect_pc_url,
            tid: result.tid
        });
    } catch (error) {
        console.error('❌ KakaoPay Ready Error:', error.message);
        res.status(500).json({ error: '결제 준비 실패' });
    }
};

exports.kakaoPayApprove = async (req, res) => {
    try {
        const { tid, pg_token, buyerWallet } = req.body;

        // 1. 카카오페이 결제 승인
        const kakaoRes = await requestKakaoPayApprove({ tid, pg_token });

        // 2. 준비 단계에서 저장한 거래 정보 불러오기
        const ready = await ReadyPayment.findOne({ tid });
        if (!ready) {
            return res.status(404).json({ error: '결제 준비 정보 없음' });
        }

        // 3. 거래 기록 저장
        const trade = await VoiceNFTTrade.create({
            tokenId: ready.tokenId,
            sellerWallet: ready.sellerWallet,
            buyerWallet,
            price: ready.price,
            tradeDate: new Date()
        });

        // 4. (선택) ReadyPayment 제거
        await ReadyPayment.deleteOne({ tid });

        res.json({
            message: '결제 승인 및 거래 등록 완료',
            kakaoPay: kakaoRes,
            trade
        });
    } catch (error) {
        console.error('❌ KakaoPay Approve Error:', error.message);
        res.status(500).json({ error: '결제 승인 실패' });
    }
};