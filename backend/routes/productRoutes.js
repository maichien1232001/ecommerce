const express = require("express");
const multer = require("multer");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  importProducts,
  getProductById,
} = require("../controllers/productController");
const {
  protect,
  isAdmin,
  auth,
  optionalAuth,
} = require("../middlewares/authMiddleware");
const upload = require("../utils/upload");

const router = express.Router();

// Route xử lý sản phẩm
const uploads = multer({ storage: multer.memoryStorage() });

router.post("/import", auth, uploads.single("file"), importProducts);
router.post("/", auth, isAdmin, upload.array("images"), createProduct);
router.put("/:productId", auth, isAdmin, upload.array("images"), updateProduct);
router.delete("/:productId", auth, isAdmin, deleteProduct);
router.get("/", optionalAuth, getProducts);
router.get("/:productId", getProductById);

module.exports = router;
