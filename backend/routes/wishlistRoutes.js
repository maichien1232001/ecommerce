// routes/wishlistRoutes.js
const express = require("express");
const wishlistController = require("../controllers/wishlistController");
const { auth } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add", auth, wishlistController.addToWishlist);
router.get("/", auth, wishlistController.getWishlist);
router.post("/delete/", auth, wishlistController.removeFromWishlist);

module.exports = router;
