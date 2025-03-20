const express = require("express");
const multer = require("multer");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  importProducts,
  getProductById
} = require("../controllers/productController");
const { protect, isAdmin } = require("../middlewares/authMiddleware");
const upload = require("../utils/upload"); // Dùng để xử lý file upload (ví dụ: multer)

const router = express.Router();

// Route xử lý sản phẩm
const uploads = multer({ storage: multer.memoryStorage() });

router.post("/import", uploads.single("file"), importProducts);
router.post("/", protect, isAdmin, upload.array("images"), createProduct); // Tạo sản phẩm
router.put(
  "/:productId",
  protect,
  isAdmin,
  upload.array("images"),
  updateProduct
); // Cập nhật sản phẩm
router.delete("/:productId", protect, isAdmin, deleteProduct); // Xóa sản phẩm
router.get("/", getProducts); // Lấy danh sách sản phẩm (với phân trang và tìm kiếm)
router.get("/:productId", getProductById); // Lấy danh sách sản phẩm (với phân trang và tìm kiếm)

module.exports = router;
