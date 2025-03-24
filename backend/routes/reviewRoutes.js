// routes/reviewRoutes.js
const express = require('express');
const reviewController = require('../controllers/reviewController');
const { auth } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add/:productId', auth, reviewController.addReview);
router.get('/:productId', reviewController.getReviews);
router.put('/:productId', auth, reviewController.updateReview);
router.delete('/:productId/:reviewId', auth, reviewController.deleteReview);

module.exports = router;
