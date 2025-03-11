const jwt = require('jsonwebtoken');
require('dotenv').config()

// Hàm tạo JWT token
const generateToken = (userId, role) => {
    console.log(process.env.JWT_SECRET);
    return jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// Hàm xác minh JWT token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken
};
