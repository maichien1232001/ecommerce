// routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { auth } = require('../middlewares/authMiddleware');

// Báo cáo doanh thu theo khoảng thời gian
router.get('/revenue', auth, reportController.getRevenueReport);

// Báo cáo số lượng đơn hàng theo khoảng thời gian
router.get('/order-count', auth, reportController.getOrderCountReport);

// Báo cáo sản phẩm bán chạy
router.get('/top-selling-products', auth, reportController.getTopSellingProducts);

// Báo cáo tổng số người dùng
router.get('/user-count', auth, reportController.getUserCountReport);

// Báo cáo tổng số đơn hàng theo trạng thái
router.get('/order-status', auth, reportController.getOrderStatusReport);

module.exports = router;
