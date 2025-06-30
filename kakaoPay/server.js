const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const kakaoRoutes = require('./routes/kakaoRoutes');

dotenv.config();

const app = express();

app.use(cors()); // ✅ 모든 요청 허용 (개발 중)
app.use(express.json());
app.use('/api/kakao', kakaoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
