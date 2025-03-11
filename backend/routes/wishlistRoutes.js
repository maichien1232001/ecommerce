// routes/wishlistRoutes.js
const express = require('express');
const wishlistController = require('../controllers/wishlistController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add', isAuthenticated, wishlistController.addToWishlist);
router.get('/', isAuthenticated, wishlistController.getWishlist);
router.delete('/remove/:productId', isAuthenticated, wishlistController.removeFromWishlist);

module.exports = router;
