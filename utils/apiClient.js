const axios = require('axios');
require('dotenv').config();

const BASE_URL = process.env.BASE_URL || 'https://api.example.com';

const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: parseInt(process.env.TEST_TIMEOUT) || 30000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    validateStatus: function (status) {
        return status >= 200 && status < 600;
    }
});

// Request interceptor for adding auth headers
apiClient.interceptors.request.use(
    (config) => {
        if (process.env.API_KEY) {
            config.headers['X-API-Key'] = process.env.API_KEY;
        }
        if (process.env.AUTH_TOKEN) {
            config.headers['Authorization'] = `Bearer ${process.env.AUTH_TOKEN}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for logging
apiClient.interceptors.response.use(
    (response) => {
        console.log(`[${response.config.method.toUpperCase()}] ${response.config.url} - ${response.status}`);
        return response;
    },
    (error) => {
        console.error(`[ERROR] ${error.config?.method?.toUpperCase()} ${error.config?.url} - ${error.response?.status}`);
        return Promise.reject(error);
    }
);

module.exports = apiClient;
