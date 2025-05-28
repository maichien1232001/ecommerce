const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/authMiddleware");
const categoryController = require("../controllers/categoryController");

router.post("/", auth, categoryController.createCategory);
router.get("/", categoryController.getAllCategories);
router.put("/:categoryId", auth, categoryController.updateCategory);
router.delete("/:categoryId", auth, categoryController.deleteCategory);

module.exports = router;
