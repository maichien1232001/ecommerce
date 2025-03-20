// routes/userProfileRoutes.js
const express = require('express');
const router = express.Router();
const { getUserProfile, getUserById, addPaymentInfo, changePassword, updateProfile, addShippingAddress, updateShippingAddress, deleteShippingAddress } = require('../controllers/userProfileController');
const { isAuthenticated, auth } = require('../middlewares/authMiddleware');

// Cập nhật thông tin cá nhân
router.put('/profile', isAuthenticated, updateProfile);

// Thay đổi mật khẩu
router.put('/change-password', isAuthenticated, changePassword);

// Quản lý địa chỉ giao hàng
router.post('/shipping-address', isAuthenticated, addShippingAddress);
router.put('/shipping-address', isAuthenticated, updateShippingAddress);
router.delete('/shipping-address', isAuthenticated, deleteShippingAddress);

// Quản lý thông tin thanh toán
router.post('/payment-info', isAuthenticated, addPaymentInfo);
router.get('/:userId', isAuthenticated, getUserById);
router.get("/", auth, getUserProfile);



module.exports = router;
