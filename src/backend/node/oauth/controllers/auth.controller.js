// src/controllers/auth.controller.js

const passport = require('passport');
const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service');

// 토큰 생성 함수
const generateLoginToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
const generateOnboardingToken = (profile) => jwt.sign({ profile }, process.env.JWT_SECRET, { expiresIn: '10m' });

// Instagram 콜백 처리
exports.handleInstagramCallback = (req, res, next) => {
  passport.authenticate('instagram', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (user) {
      const token = generateLoginToken(user.id);
      return res.redirect(`http://localhost:3000/auth-success?token=${token}`);
    }
    if (info && info.profile) {
      const onboardingToken = generateOnboardingToken(info.profile);
      return res.redirect(`http://localhost:3000/complete-profile?token=${onboardingToken}`);
    }
    return res.redirect('http://localhost:3000/login?error=auth_failed');
  })(req, res, next);
};

// X 콜백 처리
exports.handleXCallback = (req, res, next) => {
  // passport.authenticate 호출 시 session: false 옵션을 추가합니다.
  // 이 콜백 함수 내에서 에러를 더 자세히 로깅합니다.
  passport.authenticate('x', { session: false }, (err, user, info) => {
    if (err) {
      console.error('--- X OAuth 콜백 에러 발생 ---');
      console.error('에러 객체:', err); // err 객체 전체를 로깅
      console.error('에러 메시지:', err.message); // 에러 메시지
      if (err.oauthError && err.oauthError.data) {
          // passport-twitter-oauth2가 반환하는 OAuth 에러의 상세 데이터
          try {
              const errorData = JSON.parse(err.oauthError.data);
              console.error('X API 상세 에러 데이터 (파싱됨):', errorData);
          } catch (e) {
              console.error('X API 상세 에러 데이터 (파싱 실패, 원본):', err.oauthError.data);
          }
      } else if (err.response && err.response.data) { // axios 등 HTTP 클라이언트 에러 형태일 경우
          console.error('HTTP 응답 에러 데이터:', err.response.data);
      }
      console.error('--- 에러 로깅 끝 ---');

      const errorMessage = encodeURIComponent(err.message || 'X 로그인 중 알 수 없는 오류 발생');
      return res.redirect(`http://localhost:3000/login?error=${errorMessage}`);
    }
    if (!user) {
      return res.redirect('http://localhost:3000/login?error=x_failed');
    }
    const token = generateLoginToken(user.id);
    res.redirect(`http://localhost:3000/auth-success?token=${token}`);
  })(req, res, next);
};
