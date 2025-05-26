// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { isAdmin } = require("../middlewares/authMiddleware");

// Lấy tất cả người dùng (có phân trang)
router.get("/users", isAdmin, adminController.getAllUsers);

// Lấy tất cả sản phẩm (có phân trang)
// router.get("/products", isAdmin, adminController.getAllProducts);

// Lấy tất cả đơn hàng (có phân trang)
// router.get('/orders', isAdmin, adminController.getAllOrders);

module.exports = router;
