const express = require("express");
const router = express.Router();
const { auth, optionalAuth } = require("../middlewares/authMiddleware");
const categoryController = require("../controllers/categoryController");

router.post("/create", auth, categoryController.createCategory);
router.get("/", optionalAuth, categoryController.getAllCategories);
router.put("/update", auth, categoryController.updateCategory);
router.post("/delete", auth, categoryController.deleteCategory);

module.exports = router;
