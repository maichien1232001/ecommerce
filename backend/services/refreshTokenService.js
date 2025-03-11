const jwt = require('jsonwebtoken');
require('dotenv').config()

const generateRefreshToken = (userId) => {
    const secretKey = process.env.JWT_REFRESH_SECRET_KEY; // Sử dụng một secret khác cho refresh token
    const payload = { userId };

    return jwt.sign(payload, secretKey, { expiresIn: '7d' }); // Refresh token có thể có thời gian tồn tại lâu hơn, ví dụ 7 ngày
};

module.exports = { generateRefreshToken };
