const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brandController");
const { auth } = require("../middlewares/authMiddleware");

router.post("/", auth, brandController.createBrand);
router.get("/", brandController.getAllBrands);
router.get("/:id", brandController.getBrandById);
router.put("/:id", auth, brandController.updateBrand);
router.delete("/:id", auth, brandController.deleteBrand);

module.exports = router;
