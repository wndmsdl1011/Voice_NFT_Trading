require('dotenv').config();

const axios = require('axios');
const KAKAO_API_HOST = 'https://open-api.kakaopay.com/online/v1';
const SECRET_KEY = process.env.KAKAO_DEV_SECRET_KEY;
const CID = 'TC0ONETIME'; // 테스트용
const HOST = process.env.HOST_URL;

exports.requestPayment = async (data) => {
    const payload = {
        cid: CID,
        partner_order_id: 'order_1234',
        partner_user_id: 'user_1234',
        item_name: data.item_name,
        quantity: data.quantity,
        total_amount: data.total_amount,
        vat_amount: 0,
        tax_free_amount: 0,
        approval_url: `${HOST}/api/kakao/success`,
        cancel_url: `${HOST}/api/kakao/cancel`,
        fail_url: `${HOST}/api/kakao/fail`,
    };
    console.log(SECRET_KEY);
    const response = await axios.post(`${KAKAO_API_HOST}/payment/ready`, payload, {
        
        headers: {
            Authorization: `SECRET_KEY ${SECRET_KEY}`,
            'Content-Type': 'application/json',
        },
    });

    return {
        tid: response.data.tid,
        next_redirect_pc_url: response.data.next_redirect_pc_url,
    };
};

exports.approvePayment = async (tid, pg_token) => {
    const payload = {
        cid: CID,
        tid,
        partner_order_id: 'order_1234',
        partner_user_id: 'user_1234',
        pg_token,
    };

    const response = await axios.post(`${KAKAO_API_HOST}/payment/approve`, payload, {
        headers: {
            Authorization: `SECRET_KEY ${SECRET_KEY}`,
            'Content-Type': 'application/json',
        },
    });

    return response.data;
};
