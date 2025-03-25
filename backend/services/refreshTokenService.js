const jwt = require('jsonwebtoken');
require('dotenv').config()

const generateRefreshToken = (userId) => {
    const secretKey = process.env.JWT_REFRESH_SECRET_KEY;
    const payload = { userId };

    return jwt.sign(payload, secretKey, { expiresIn: '7d' });
};

module.exports = { generateRefreshToken };
