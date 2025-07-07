// server.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

const oauthRouter = require('./oauth/routes/index.js'); // ✅ Instagram만 포함된 라우터

const app = express();

// 📦 공통 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// 🔐 세션 설정 (OAuth 인증 흐름에 필요)
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_session_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    }
}));

// 🛂 Passport 초기화 및 세션 연동
app.use(passport.initialize());
app.use(passport.session());
require('./oauth/config/passport.config')(passport); // ✅ Instagram Strategy만 활성화된 passport 설정

// 🗄️ MongoDB 연결
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => console.error('❌ MongoDB connection failed:', err));

// 🔗 OAuth 라우터 연결 (/api/auth/instagram)
app.use('/api/auth', oauthRouter);

// 🚀 서버 실행
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
