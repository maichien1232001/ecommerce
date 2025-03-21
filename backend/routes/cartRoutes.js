const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { auth } = require("../middlewares/authMiddleware");

router.post("/add", auth, cartController.addToCart);
router.get("/", auth, cartController.getCart);
router.put("/update/:productId", auth, cartController.updateItemQuantity);
router.delete("/remove/:productId", auth, cartController.removeItemFromCart);

module.exports = router;
