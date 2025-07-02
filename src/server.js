require('dotenv').config(); // .env 파일 로드. 반드시 최상단에 위치!

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const authRoutes = require('./routes/auth');

// Passport 설정 불러오기
require('./config/passport')(passport);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS 설정
app.use(cors({
  origin: 'http://localhost:3000', // 프론트엔드 URL
  credentials: true,
}));

// Passport 미들웨어 초기화
app.use(passport.initialize());

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);

// 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});