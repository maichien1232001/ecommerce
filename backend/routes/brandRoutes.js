const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brandController");

// Create
router.post("/", brandController.createBrand);

// Get all
router.get("/", brandController.getAllBrands);

// Get one
router.get("/:id", brandController.getBrandById);

// Update
router.put("/:id", brandController.updateBrand);

// Delete
router.delete("/:id", brandController.deleteBrand);

module.exports = router;
