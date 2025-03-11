const User = require('../models/User');
const jwt = require('../config/jwt');
const { generateRefreshToken } = require('../services/refreshTokenService');
const bcrypt = require('bcryptjs');
require('dotenv').config()

exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }

    try {
        // Kiểm tra refresh token hợp lệ
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);

        // Tìm người dùng trong cơ sở dữ liệu
        const user = await User.findById(decoded.userId);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        // Tạo một access token mới
        const newAccessToken = generateToken(user.id, user.role);

        res.json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
};

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    console.log(req.body);


    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });

        const accessToken = jwt.generateToken(user.id, user.role);

        // Tạo Refresh Token
        const refreshToken = generateRefreshToken(user.id);
        user.refreshToken = refreshToken;
        await user.save();
        res.status(201).json({ user, accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const accessToken = jwt.generateToken(user.id, user.role);

        // Tạo Refresh Token
        const refreshToken = generateRefreshToken(user.id);

        // Lưu Refresh Token vào cơ sở dữ liệu (có thể là trong User)
        user.refreshToken = refreshToken;
        res.status(200).json({ user, accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.socialLogin = (provider) => async (req, res) => {
    const { providerId, email, name } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ name, email, socialLogin: { provider, providerId } });
        }

        const accessToken = jwt.generateToken(user.id, user.role);

        // Tạo Refresh Token
        const refreshToken = generateRefreshToken(user.id);
        res.status(200).json({ user, accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
