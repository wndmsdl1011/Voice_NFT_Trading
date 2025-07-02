import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

function SocialLoginPage() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      alert(decodeURIComponent(error));
    }
  }, [searchParams]);

  const handleInstagramLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/instagram';
  };

  const handleXLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/x';
  };

  return (
    <div>
      <h2>Social Login</h2>
      <p>로그인할 소셜 계정을 선택해주세요.</p>
      <div>
        <button onClick={handleInstagramLogin} style={{marginRight: '10px'}}>인스타그램으로 로그인</button>
        <button onClick={handleXLogin}>X로 로그인</button>
      </div>
      <br/>
      <Link to="/">홈으로</Link>
    </div>
  );
}

export default SocialLoginPage;