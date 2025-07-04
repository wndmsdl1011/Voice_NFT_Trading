const { generateToken } = require('../utils/jwt');

exports.handleOAuthCallback = (req, res) => {
  const { err, user, info } = req.oauth;

  if (err) {
    const errorMsg = encodeURIComponent(err.message || 'OAuth 에러');
    return res.redirect(`http://localhost:3000/login?error=${errorMsg}`);
  }

  if (user) {
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
    const onboardingToken = generateToken({ profile: info.profile }, '10m');
    res.cookie('onboarding_token', onboardingToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 600000,
    });
    return res.redirect('http://localhost:3000/complete-profile');
  }

  return res.redirect('http://localhost:3000/login?error=auth_failed');
};
