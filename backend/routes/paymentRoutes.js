// routes/paymentRoutes.js
const express = require('express');
const { createPayment, capturePayment } = require('../controllers/paymentController');
const router = express.Router();

router.post('/create-payment', createPayment);
router.post('/capture-payment', capturePayment);

module.exports = router;
