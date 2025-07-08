const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Voice NFT API',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        provider: {
                            type: 'string',
                            enum: ['kakao', 'naver'],
                        },
                        nickname: { type: 'string' },
                        email: { type: 'string' },
                        profileImage: { type: 'string' },
                        walletAddress: { type: 'string' },
                        age: { type: 'integer' },
                        job: { type: 'string' },
                        voiceCategory: { type: 'string' },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                },
                VoiceNFT: {
                    type: 'object',
                    properties: {
                        tokenId: { type: 'string' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        tags: {
                            type: 'array',
                            items: { type: 'string' }
                        },
                        price: { type: 'number', format: 'float' },
                        mint_date: { type: 'string', format: 'date-time' },
                        likes_count: { type: 'integer' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    }
                }
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: [
        path.join(__dirname, '../routes/*.js'),
        path.join(__dirname, '../controllers/*.js'),
        path.join(__dirname, '../oauth/routes/*.js'),
        path.join(__dirname, '../voice_nft/controllers/*.js'), // ✅ 수정
        path.join(__dirname, '../voice_nft/routes/*.js'),      // ✅ 수정
        // ❌ voice-nft → ✅ voice_nft
    ],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
