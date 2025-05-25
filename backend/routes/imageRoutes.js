const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { auth } = require("../middlewares/authMiddleware");

const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");

// Route upload nhiều ảnh
router.post(
  "/upload-images",
  auth,
  upload.array("images"),
  imageController.uploadImages
);

router.post("/delete-image", auth, imageController.deleteImage);

module.exports = router;
