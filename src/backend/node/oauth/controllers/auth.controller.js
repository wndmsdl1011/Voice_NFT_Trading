const { generateToken } = require('../utils/jwt');

exports.handleOAuthCallback = (req, res) => {
  console.log('[CONTROLLER] handleOAuthCallback 실행됨');
  console.log('[CONTROLLER] req.oauth:', req.oauth);

  const { err, user, info } = req.oauth;

  if (err) {
    const errorMsg = encodeURIComponent(err.message || 'OAuth 에러');
    console.error('[CONTROLLER] OAuth 에러 발생:', err);
    return res.redirect(`http://localhost:3000/login?error=${errorMsg}`);
  }

  if (user) {
    console.log('[CONTROLLER] 기존 사용자 로그인:', user);
    const token = generateToken({ id: user.id });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 3600000,
    });
    return res.redirect('http://localhost:3000/auth-success');
  }

  if (info?.profile) {
    console.log('[CONTROLLER] 신규 사용자 - 온보딩 필요:', info.profile);
    const onboardingToken = generateToken({ profile: info.profile }, '10m');
    res.cookie('onboarding_token', onboardingToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 600000,
    });
    return res.redirect('http://localhost:3000/complete-profile');
  }

  console.warn('[CONTROLLER] 인증 실패 - user도 없고 info.profile도 없음');
  return res.redirect('http://localhost:3000/login?error=auth_failed');
};
