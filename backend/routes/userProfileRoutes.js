// routes/userProfileRoutes.js
const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

// Cập nhật thông tin cá nhân
router.put('/profile', isAuthenticated, userProfileController.updateProfile);

// Thay đổi mật khẩu
router.put('/change-password', isAuthenticated, userProfileController.changePassword);

// Quản lý địa chỉ giao hàng
router.post('/shipping-address', isAuthenticated, userProfileController.addShippingAddress);
router.put('/shipping-address', isAuthenticated, userProfileController.updateShippingAddress);
router.delete('/shipping-address', isAuthenticated, userProfileController.deleteShippingAddress);

// Quản lý thông tin thanh toán
router.post('/payment-info', isAuthenticated, userProfileController.addPaymentInfo);

module.exports = router;
