const express = require('express');
const { createOrder, getUserOrders, getOrderById, updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const { auth } = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes cho đơn hàng
router.post('/create', auth, createOrder);  // Tạo đơn hàng mới
router.get('/', auth, getUserOrders);  // Lấy danh sách đơn hàng của người dùng
// router.get('/all', auth, getUserOrders);  // Lấy danh sách tất cả đơn hàng của người dùng
router.get('/:orderId', auth, getOrderById);  // Lấy chi tiết đơn hàng
router.put('/:orderId/status', auth, updateOrderStatus);  // Cập nhật trạng thái đơn hàng
router.delete('/delete/:orderId', auth, deleteOrder)

module.exports = router;
