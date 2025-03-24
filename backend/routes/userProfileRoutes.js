// routes/userProfileRoutes.js
const express = require('express');
const router = express.Router();
const { getUserProfile, getUserById, updatePaymentInfo, addPaymentInfo, changePassword, updateProfile, addShippingAddress, updateShippingAddress, deleteShippingAddress, deleteUserProfile } = require('../controllers/userProfileController');
const { auth } = require('../middlewares/authMiddleware');

// Cập nhật thông tin cá nhân
router.put('/', auth, updateProfile);

// Thay đổi mật khẩu
router.put('/change-password', auth, changePassword);

// Quản lý địa chỉ giao hàng
router.post('/shipping-address', auth, addShippingAddress);
router.put('/shipping-address/:userId', auth, updateShippingAddress);
router.delete('/shipping-address/:userId', auth, deleteShippingAddress);

// Quản lý thông tin thanh toán
router.post('/payment-info', auth, addPaymentInfo);
router.put('/payment-info', auth, updatePaymentInfo);
router.get('/:userId', auth, getUserById);
router.get("/", auth, getUserProfile);
router.delete("/delete/:userId", auth, deleteUserProfile);



module.exports = router;
