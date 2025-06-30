import React from 'react';
import axios from 'axios';

const KakaoPayButton = () => {
    const handlePayment = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/kakao/pay', {
                item_name: '초코파이',
                quantity: 1,
                total_amount: 2200,
            });

            const { redirectUrl, tid } = res.data;
            console.log("📦 받은 tid:", tid);
            localStorage.setItem('kakao_tid', tid);

            window.location.href = redirectUrl;
        } catch (error) {
            console.error('결제 요청 실패:', error);
            alert('결제 요청 중 오류가 발생했습니다.');
        }
    };

    return (
        <button onClick={handlePayment}>
            카카오페이로 결제하기
        </button>
    );
};

export default KakaoPayButton;
