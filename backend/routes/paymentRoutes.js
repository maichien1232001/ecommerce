// routes/paymentRoutes.js
const express = require("express");
const {
  createPayment,
  capturePayment,
  createPaymentUrl,
  vnpayReturn,
} = require("../controllers/paymentController");
const { auth } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create-payment", auth, createPayment);
router.post("/capture-payment", auth, capturePayment);
router.post("/create_payment_url", auth, createPaymentUrl);
router.get("/vnpay_return", auth, vnpayReturn);

module.exports = router;
