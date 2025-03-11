// userProfileController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { handleError } = require('../utils/errorHandler');

// Cập nhật thông tin cá nhân
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Lấy ID người dùng từ middleware (người dùng đã đăng nhập)
        const { name, email, phoneNumber } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Người dùng không tồn tại' });
        }

        // Cập nhật thông tin
        user.name = name || user.name;
        user.email = email || user.email;
        user.phoneNumber = phoneNumber || user.phoneNumber;

        await user.save();

        return res.status(200).json({ message: 'Thông tin cá nhân đã được cập nhật', user });
    } catch (error) {
        handleError(res, error);
    }
};

exports.changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Người dùng không tồn tại' });
        }

        // Kiểm tra mật khẩu cũ
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Mật khẩu cũ không chính xác' });
        }

        // Mã hóa mật khẩu mới
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();

        return res.status(200).json({ message: 'Mật khẩu đã được thay đổi' });
    } catch (error) {
        handleError(res, error);
    }
};

exports.addShippingAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { address, city, postalCode, country } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Người dùng không tồn tại' });
        }

        const newAddress = { address, city, postalCode, country };
        user.shippingAddresses.push(newAddress);
        await user.save();

        return res.status(200).json({ message: 'Địa chỉ giao hàng đã được thêm', user });
    } catch (error) {
        handleError(res, error);
    }
};

// Cập nhật địa chỉ giao hàng
exports.updateShippingAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { addressId, address, city, postalCode, country } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Người dùng không tồn tại' });
        }

        const addressIndex = user.shippingAddresses.findIndex(addr => addr._id.toString() === addressId);
        if (addressIndex === -1) {
            return res.status(404).json({ error: 'Địa chỉ không tồn tại' });
        }

        user.shippingAddresses[addressIndex] = { address, city, postalCode, country };
        await user.save();

        return res.status(200).json({ message: 'Địa chỉ giao hàng đã được cập nhật', user });
    } catch (error) {
        handleError(res, error);
    }
};

// Xóa địa chỉ giao hàng
exports.deleteShippingAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { addressId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Người dùng không tồn tại' });
        }

        user.shippingAddresses = user.shippingAddresses.filter(addr => addr._id.toString() !== addressId);
        await user.save();

        return res.status(200).json({ message: 'Địa chỉ giao hàng đã được xóa', user });
    } catch (error) {
        handleError(res, error);
    }
};

exports.addPaymentInfo = async (req, res) => {
    try {
        const userId = req.user.id;
        const { cardNumber, expirationDate, cardHolderName } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Người dùng không tồn tại' });
        }

        user.paymentInfo = { cardNumber, expirationDate, cardHolderName };
        await user.save();

        return res.status(200).json({ message: 'Thông tin thanh toán đã được thêm', user });
    } catch (error) {
        handleError(res, error);
    }
};