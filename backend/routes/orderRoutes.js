const express = require('express');
const { createOrder, getUserOrders, getOrderById, updateOrderStatus } = require('../controllers/orderController');
const { auth } = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes cho đơn hàng
router.post('/create', auth, createOrder);  // Tạo đơn hàng mới
router.get('/', auth, getUserOrders);  // Lấy danh sách đơn hàng của người dùng
router.get('/:orderId', auth, getOrderById);  // Lấy chi tiết đơn hàng
router.put('/:orderId/status', auth, updateOrderStatus);  // Cập nhật trạng thái đơn hàng

module.exports = router;
