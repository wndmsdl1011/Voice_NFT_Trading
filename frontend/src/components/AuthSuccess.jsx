import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function AuthSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      localStorage.setItem('userInfo', JSON.stringify({ token }));
      navigate('/');
    } else {
      console.error('No token found in URL.');
      navigate('/login');
    }
  }, [searchParams, navigate]);

  return (
    <div>
      <h2>로그인 처리 중...</h2>
    </div>
  );
}

export default AuthSuccess;