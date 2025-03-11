// routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Báo cáo doanh thu theo khoảng thời gian
router.get('/revenue', reportController.getRevenueReport);

// Báo cáo số lượng đơn hàng theo khoảng thời gian
router.get('/order-count', reportController.getOrderCountReport);

// Báo cáo sản phẩm bán chạy
router.get('/top-selling-products', reportController.getTopSellingProducts);

// Báo cáo tổng số người dùng
router.get('/user-count', reportController.getUserCountReport);

// Báo cáo tổng số đơn hàng theo trạng thái
router.get('/order-status', reportController.getOrderStatusReport);

module.exports = router;
