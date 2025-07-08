require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('./Oauth/utils/db');
const authRoutes = require('./Oauth/routes/auth.routes');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // 프론트엔드 주소
  credentials: true,               // 쿠키 포함하려면 true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
