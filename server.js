// backend/src/server.js

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const mainRouter = require('./routes'); // <-- 이 변수 이름으로 불러왔습니다.

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// 세션 미들웨어
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_default_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false ,  sameSite: 'lax'}
}));

// Passport 미들웨어
app.use(passport.initialize());
app.use(passport.session());

// Passport 설정 불러오기 (passport 초기화 이후에 위치)
require('./config/passport')(passport);

// DB 연결
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// 라우트 설정
app.use('/api/auth', mainRouter); // <-- authRoutes를 mainRouter로 변경!

// 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});