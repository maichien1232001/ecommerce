const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const path = require("path");

exports.uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No files uploaded.");
    }

    // === Giả sử ảnh cũ được gửi từ client (trong formData.imagesInfo) ===
    let existingImages = [];
    if (req.body.imagesInfo) {
      existingImages = JSON.parse(req.body.imagesInfo); // mảng [{ url, public_id }]
    }

    const uploadedUrls = [];

    for (const file of req.files) {
      const filePath = path.resolve(__dirname, "..", "uploads", file.filename);

      if (!fs.existsSync(filePath)) continue;

      const result = await cloudinary.uploader.upload(filePath, {
        folder: "computers",
      });

      uploadedUrls.push({
        url: result.secure_url,
        public_id: result.public_id,
      });

      fs.unlinkSync(filePath);
    }

    const allImages = [...existingImages, ...uploadedUrls];

    res.status(200).json({ images: allImages });
  } catch (err) {
    console.error("UPLOAD ERROR: ", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) {
      return res.status(400).json({ message: "Missing public_id" });
    }

    await cloudinary.uploader.destroy(public_id);
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete image", error });
  }
};
