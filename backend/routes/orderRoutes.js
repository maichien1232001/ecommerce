const express = require("express");
const {
  getAllOrders,
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const { auth } = require("../middlewares/authMiddleware");

const router = express.Router();

// Routes cho đơn hàng
router.get("/", auth, getAllOrders);
router.post("/create", auth, createOrder);
router.get("/user-order", auth, getUserOrders);
router.get("/:orderId", auth, getOrderById);
router.put("/status", auth, updateOrderStatus);
router.delete("/delete/:orderId", auth, deleteOrder);

module.exports = router;
