// routes/couponRoutes.js
const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const { isAdmin, auth } = require('../middlewares/authMiddleware'); // Middleware kiểm tra quyền admin

// Tạo mã giảm giá mới
router.post('/create', isAdmin, auth, couponController.createCoupon);

// Lấy danh sách tất cả mã giảm giá
router.get('/', auth, isAdmin, couponController.getAllCoupons);

router.get('/:couponId', auth, isAdmin, couponController.getCouponById);
// Áp dụng mã giảm giá
router.post('/apply/', auth, couponController.applyCoupon);

// Cập nhật mã giảm giá
router.put('/update/:couponId', auth, isAdmin, couponController.updateCoupon);

// Xóa mã giảm giá
router.delete('/delete/:couponId', auth, isAdmin, couponController.deleteCoupon);

module.exports = router;
