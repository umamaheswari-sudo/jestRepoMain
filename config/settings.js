require('dotenv').config();

module.exports = {
    baseUrl: process.env.BASE_URL || 'https://api.example.com',
    apiKey: process.env.API_KEY || '',
    authToken: process.env.AUTH_TOKEN || '',
    timeout: parseInt(process.env.TEST_TIMEOUT) || 30000,

    environments: {
        dev: 'https://dev-api.example.com',
        staging: 'https://staging-api.example.com',
        prod: 'https://api.example.com'
    }
};
