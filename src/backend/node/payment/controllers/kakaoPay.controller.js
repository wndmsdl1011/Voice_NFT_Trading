const {
    requestKakaoPayReady,
    requestKakaoPayApprove,
} = require('../services/kakaoPay.service');
const VoiceNFTTrade = require('../../NFT/models/voice_nft_trade.model');

exports.kakaoPayReady = async (req, res) => {
    try {
        const { item_name, quantity, total_amount } = req.body;

        const result = await requestKakaoPayReady({ item_name, quantity, total_amount });

        res.json({
            next_redirect_pc_url: result.next_redirect_pc_url,
            tid: result.tid,
        });
    } catch (error) {
        console.error('❌ KakaoPay Ready Error:', error.message);
        res.status(500).json({ error: '결제 준비 실패' });
    }
};

exports.kakaoPayApprove = async (req, res) => {
    try {
        const { tid, pg_token, buyerWallet, sellerWallet, tokenId, price } = req.body;

        // 1. 카카오 결제 승인
        const result = await requestKakaoPayApprove({ tid, pg_token });

        // 2. 거래 내역 DB 저장
        const trade = new VoiceNFTTrade({
            tokenId,
            buyerWallet,
            sellerWallet,
            price,
            tradeDate: new Date(), // 생략 가능, 기본값 있음
        });

        await trade.save();

        // 3. 응답 반환
        res.json({
            message: '결제 승인 및 거래 등록 완료',
            kakaoPay: result,
            trade,
        });
    } catch (error) {
        console.error('❌ KakaoPay Approve Error:', error.message);
        res.status(500).json({ error: '결제 승인 실패' });
    }
};
