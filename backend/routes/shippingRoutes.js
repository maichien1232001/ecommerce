// routes/shippingRoutes.js
const express = require('express');
const router = express.Router();
const shippingController = require('../controllers/shippingController');

router.post('/create', shippingController.createShippingMethod);
router.get('/', shippingController.getShippingMethods);
router.get('/:shippingMethodId', shippingController.getShippingMethodById);
router.put('/:shippingMethodId', shippingController.updateShippingMethod);
router.delete('/:shippingMethodId', shippingController.deleteShippingMethod);
router.post('/calculate', shippingController.calculateShippingCost);

module.exports = router;
