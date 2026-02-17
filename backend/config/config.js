const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

const config = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV || 'development'
};

// Simple validation to ensure critical variables are present
const requiredConfig = ['MONGO_URI', 'JWT_SECRET'];
const missingConfig = requiredConfig.filter(key => !config[key]);

if (missingConfig.length > 0) {
    throw new Error(`Critical environment variables missing: ${missingConfig.join(', ')}`);
}

module.exports = config;
