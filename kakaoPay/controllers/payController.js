const kakaoService = require('../services/payService');

exports.requestPayment = async (req, res) => {
    try {
        const { next_redirect_pc_url, tid } = await kakaoService.requestPayment(req.body);
        res.json({ redirectUrl: next_redirect_pc_url, tid }); // ✅ tid 포함
    } catch (error) {
        console.error("❌ 결제 요청 실패:", error.response?.data || error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.approvePayment = async (req, res) => {
    try {
        const { pg_token, tid } = req.query;
        console.log("✅ 승인 요청:", { pg_token, tid });

        if (!pg_token || !tid) {
            return res.status(400).json({ error: "tid 또는 pg_token이 누락되었습니다." });
        }

        const approval = await kakaoService.approvePayment(tid, pg_token);
        res.json(approval);
    } catch (error) {
        console.error("❌ 승인 실패:", error.response?.data || error.message);
        res.status(500).json({ error: error.message });
    }
};
