// routes/couponRoutes.js
const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const { isAdmin } = require('../middlewares/authMiddleware'); // Middleware kiểm tra quyền admin

// Tạo mã giảm giá mới
router.post('/create', isAdmin, couponController.createCoupon);

// Lấy danh sách tất cả mã giảm giá
router.get('/', couponController.getAllCoupons);

// Áp dụng mã giảm giá
router.post('/apply/', couponController.applyCoupon);

// Cập nhật mã giảm giá
router.put('/update', isAdmin, couponController.updateCoupon);

// Xóa mã giảm giá
router.delete('/delete/:couponId', isAdmin, couponController.deleteCoupon);

module.exports = router;
