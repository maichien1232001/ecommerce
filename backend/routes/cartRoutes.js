const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { auth } = require("../middlewares/authMiddleware");

router.post("/add", cartController.addToCart);
router.post("/", cartController.getCart);
router.put("/update/", cartController.updateItemQuantity);
router.post("/remove/", cartController.removeItemFromCart);

module.exports = router;
