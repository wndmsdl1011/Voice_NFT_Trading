require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('./Oauth/utils/db');

const authRoutes = require('./Oauth/routes/auth.routes');
const nftRoutes = require('./NFT/routes/nft.routes');
const userRoutes = require('./Oauth/routes/user.routes');
const voiceNftRoutes = require('./voice_nft/routes/voice_nft.routes');
const cors = require('cors');

// Swagger 설정
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swagger');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // 프론트엔드 주소
  credentials: true,               // 쿠키 포함하려면 true
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('authRoutes:', typeof authRoutes);
console.log('nftRoutes:', typeof nftRoutes);
console.log('userRoutes:', typeof userRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/nft', nftRoutes);
app.use('/api/user', userRoutes);
app.use('/api/voice-nfts', voiceNftRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
