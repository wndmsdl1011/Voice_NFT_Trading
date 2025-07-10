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
                        walletAddress: { type: 'string', description: '발행자 지갑 주소' }
                    }
                },
                VoiceNFTTrade: {
                    type: 'object',
                    properties: {
                        tokenId: { type: 'string', description: '거래된 NFT의 토큰 ID' },
                        sellerWallet: { type: 'string', description: '판매자 지갑 주소' },
                        buyerWallet: { type: 'string', description: '구매자 지갑 주소' },
                        price: { type: 'number', format: 'float', description: '거래 가격' },
                        tradeDate: { type: 'string', format: 'date-time', description: '거래 일시' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' }
                    }
                },
                UserWithNFTResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        user: {
                            $ref: '#/components/schemas/User'
                        },
                        mintedNFTs: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/VoiceNFT' }
                        },
                        purchasedNFTs: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/VoiceNFT' }
                        }
                    }
                },
                ReadyPayment: {
                    type: 'object',
                    properties: {
                        tid: {
                            type: 'string',
                            description: '카카오페이 결제 고유 번호 (TID)'
                        },
                        tokenId: {
                            type: 'string',
                            description: '결제 대상 NFT의 토큰 ID'
                        },
                        sellerWallet: {
                            type: 'string',
                            description: '판매자 지갑 주소'
                        },
                        price: {
                            type: 'number',
                            format: 'float',
                            description: '결제 가격'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: '생성 시각'
                        }
                    }
                }

            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: [
        path.join(__dirname, '../oauth/routes/*.js'),
        path.join(__dirname, '../NFT/routes/*.js'),
        path.join(__dirname, '../payment/routes/*.js'),
    ],
};

const specs = swaggerJsdoc(options);
module.exports = specs;