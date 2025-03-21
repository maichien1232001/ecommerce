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
const { protect, isAdmin, auth } = require("../middlewares/authMiddleware");
const upload = require("../utils/upload"); // Dùng để xử lý file upload (ví dụ: multer)

const router = express.Router();

// Route xử lý sản phẩm
const uploads = multer({ storage: multer.memoryStorage() });

router.post("/import", auth, uploads.single("file"), importProducts);
router.post("/", auth, isAdmin, upload.array("images"), createProduct); // Tạo sản phẩm
router.put(
  "/:productId",
  auth,
  isAdmin,
  upload.array("images"),
  updateProduct
); // Cập nhật sản phẩm
router.delete("/:productId", auth, isAdmin, deleteProduct); // Xóa sản phẩm
router.get("/", getProducts); // Lấy danh sách sản phẩm (với phân trang và tìm kiếm)
router.get("/:productId", auth, getProductById); // Lấy danh sách sản phẩm (với phân trang và tìm kiếm)

module.exports = router;
