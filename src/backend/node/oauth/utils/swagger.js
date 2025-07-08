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
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: [
        path.join(__dirname, '../routes/*.js'),
        path.join(__dirname, '../controllers/*.js'),
        path.join(__dirname, '../oauth/routes/*.js'),
    ],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
