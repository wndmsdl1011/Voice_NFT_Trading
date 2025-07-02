import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CompleteProfilePage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const onboardingToken = searchParams.get('token');

  useEffect(() => {
    if (!onboardingToken) {
      setError('잘못된 접근입니다. 다시 로그인해주세요.');
    }
  }, [onboardingToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/complete-instagram', {
        token: onboardingToken,
        email: email,
      });
      const { token } = response.data;
      localStorage.setItem('userInfo', JSON.stringify({ token }));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || '회원가입을 완료할 수 없습니다.');
    }
  };

  return (
    <div>
      <h2>회원가입 완료하기</h2>
      <p>인스타그램 계정 연동을 위해 이메일 주소를 입력해주세요.</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your@email.com"
          />
        </div>
        <button type="submit" disabled={!onboardingToken}>
          가입 완료
        </button>
      </form>
    </div>
  );
}

export default CompleteProfilePage;