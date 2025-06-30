import { useEffect } from 'react';
import axios from 'axios';

const KakaoPaySuccess = () => {
    useEffect(() => {
        const fetchApproval = async () => {
            const pg_token = new URLSearchParams(window.location.search).get('pg_token');
            const tid = localStorage.getItem('kakao_tid');
            console.log("✅ 승인 요청 시 tid:", tid, "pg_token:", pg_token);

            if (!pg_token || !tid) {
                alert("필수 정보 누락");
                return;
            }

            try {
                const res = await axios.get(`http://localhost:5000/api/kakao/success?tid=${tid}&pg_token=${pg_token}`);
                console.log("결제 승인 성공:", res.data);
                alert("결제가 완료되었습니다!");
            } catch (error) {
                console.error("결제 승인 실패:", error.response?.data || error.message);
                alert("결제 승인 중 오류 발생");
            }
        };

        fetchApproval();
    }, []);

    return <div>결제 승인 중입니다...</div>;
};

export default KakaoPaySuccess;
