const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 1시간 유효한 로그인 토큰
const generateLoginToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
// 10분 유효한 가입 진행 토큰
const generateOnboardingToken = (profile) => jwt.sign({ profile }, process.env.JWT_SECRET, { expiresIn: '10m' });

// --- Instagram 인증 흐름 ---
router.get('/instagram', passport.authenticate('instagram'));
router.get('/instagram/callback', (req, res, next) => {
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
});

// --- 인스타그램 가입 완료 API ---
router.post('/complete-instagram', async (req, res) => {
  const { token, email } = req.body;
  if (!token || !email) return res.status(400).json({ message: 'Token and email are required.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const profile = decoded.profile;
    
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(409).json({ message: `이미 ${user.provider}(으)로 가입된 이메일입니다.` });
    }

    const newUser = await User.create({
      email: email,
      username: profile.displayName,
      provider: 'instagram',
      instagramId: profile.id
    });

    const loginToken = generateLoginToken(newUser.id);
    res.status(201).json({ token: loginToken, user: newUser });
  } catch (err) {
    if (err.name === 'JsonWebTokenError') return res.status(401).json({ message: 'Invalid token.' });
    if (err.code === 11000) return res.status(409).json({ message: 'This email is already registered.' });
    res.status(500).json({ message: 'Server error.' });
  }
});

// --- X 인증 흐름 ---
router.get('/x', passport.authenticate('x', { scope: ['users.read', 'tweet.read'] }));
router.get('/x/callback', (req, res, next) => {
  passport.authenticate('x', (err, user, info) => {
    if (err) {
      const errorMessage = encodeURIComponent(err.message);
      return res.redirect(`http://localhost:3000/login?error=${errorMessage}`);
    }
    if (!user) {
      return res.redirect('http://localhost:3000/login?error=x_failed');
    }
    const token = generateLoginToken(user.id);
    res.redirect(`http://localhost:3000/auth-success?token=${token}`);
  })(req, res, next);
});

module.exports = router;