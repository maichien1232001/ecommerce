// routes/userProfileRoutes.js
const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  getUserById,
  changePassword,
  updateProfile,

  deleteUserProfile,
  managePaymentInfo,
  manageShippingAddresses,
} = require("../controllers/userProfileController");
const { auth } = require("../middlewares/authMiddleware");

router.put("/", auth, updateProfile);
router.put("/change-password", auth, changePassword);
router.post("/payment", auth, managePaymentInfo);
router.post("/shipping", auth, manageShippingAddresses);
router.get("/:userId", auth, getUserById);
router.get("/", auth, getUserProfile);
router.delete("/delete/:userId", auth, deleteUserProfile);

module.exports = router;
