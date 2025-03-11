// routes/reviewRoutes.js
const express = require('express');
const reviewController = require('../controllers/reviewController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add', isAuthenticated, reviewController.addReview);
router.get('/:productId', reviewController.getReviews);
router.put('/:productId', isAuthenticated, reviewController.updateReview);

module.exports = router;
