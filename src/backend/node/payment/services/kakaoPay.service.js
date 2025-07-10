const axios = require('axios');
require('dotenv').config();

const KAKAO_BASE_URL = 'https://kapi.kakao.com/v1/payment';

const HEADERS = {
    Authorization: `KakaoAK ${process.env.KAKAO_ADMIN_KEY}`,
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
};

exports.requestKakaoPayReady = async ({ item_name, quantity, total_amount }) => {
    const params = new URLSearchParams({
        cid: process.env.CID,
        partner_order_id: 'ORDER_ID_1234',
        partner_user_id: 'USER_ID_5678',
        item_name,
        quantity,
        total_amount,
        vat_amount: 0,
        tax_free_amount: 0,
        approval_url: 'http://localhost:3000/payment/success',
        cancel_url: 'http://localhost:3000/payment/cancel',
        fail_url: 'http://localhost:3000/payment/fail',
    });

    const res = await axios.post(`${KAKAO_BASE_URL}/ready`, params, { headers: HEADERS });
    return res.data;
};

exports.requestKakaoPayApprove = async ({ tid, pg_token }) => {
    const params = new URLSearchParams({
        cid: process.env.CID,
        tid,
        partner_order_id: 'ORDER_ID_1234',
        partner_user_id: 'USER_ID_5678',
        pg_token,
    });

    const res = await axios.post(`${KAKAO_BASE_URL}/approve`, params, { headers: HEADERS });
    return res.data;
};
