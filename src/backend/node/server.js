// server.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const { exec } = require('child_process');
const path = require('path');

const oauthRouter = require('./oauth/routes/index.js'); // Instagram OAuth

const app = express();

// 📦 공통 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.post('/deploy', (req, res) => {
    console.log('✅ /deploy 요청 수신:', req.body);
    res.json({ success: true, message: '배포 요청 처리 완료!' });
});


// 🔐 세션 설정
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_session_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    }
}));

// 🛂 Passport 설정
app.use(passport.initialize());
app.use(passport.session());
require('./oauth/config/passport.config')(passport);

// 🗄️ MongoDB 연결
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => console.error('❌ MongoDB connection failed:', err));

// 🔗 OAuth 라우터
app.use('/api/auth', oauthRouter);

// ✅ NFT 컨트랙트 자동 배포 및 ABI 복사 API
app.post('/api/deploy', (req, res) => {
    const rootPath = path.resolve(__dirname, '../../'); // VOICE_NFT_TRADING 루트
    const trufflePath = path.join(rootPath, 'truffle-project');
    const frontendPath = path.join(rootPath, 'src/front/src/contracts');

    const command = `
        cd "${trufflePath}" && 
        truffle migrate --reset && 
        cp build/contracts/MyAudioNFT.json "${frontendPath}"
    `;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('❌ 배포 오류:', error);
            return res.status(500).json({ error: '배포 실패', details: stderr });
        }
        console.log('✅ 배포 완료\n', stdout);
        return res.json({ message: '✅ 자동 배포 및 ABI 복사 완료', output: stdout });
    });
});

// 🚀 서버 실행
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
