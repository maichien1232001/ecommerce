const User = require('../models/User');
const jwt = require('../config/jwt');
const { generateRefreshToken } = require('../services/refreshTokenService');
const bcrypt = require('bcryptjs');
require('dotenv').config()

exports.refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken; // Đọc refreshToken từ cookies
        if (!refreshToken) {
            return res.status(400).json({ message: "Refresh token is required" });
        }

        // Giải mã token
        const decoded = jwt.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(403).json({ message: "Không tìm thấy user" });
        }

        // Tạo Access Token mới
        const newAccessToken = jwt.generateToken(user.id, user.role);

        return res.json({ accessToken: newAccessToken });
    } catch (error) {
        console.error("Refresh Token Error:", error);
        return res.status(403).json({ message: "Invalid or expired refresh token" });
    }
};

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        const accessToken = jwt.generateToken(user.id, user.role);
        const refreshToken = generateRefreshToken(user.id);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production", // Bật secure khi chạy production
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
        });


        await user.save();
        res.status(201).json({ user, accessToken });
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
        const refreshToken = generateRefreshToken(user.id);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production", // Bật secure khi chạy production
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
        });
        res.status(200).json({ user, accessToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// exports.refreshToken = async (req, res) => {
//     const refreshToken = req.cookies.refreshToken;
//     if (!refreshToken) return res.status(403).json({ message: "No refresh token" });

//     jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, user) => {
//         if (err) return res.status(403).json({ message: "Invalid refresh token" });

//         const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

//         res.cookie("refreshToken", newRefreshToken, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "Strict",
//             maxAge: 7 * 24 * 60 * 60 * 1000,
//         });

//         res.json({ accessToken });
//     });
// };

// Route logout (xóa cookie refreshToken)
exports.logOut = async (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
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
