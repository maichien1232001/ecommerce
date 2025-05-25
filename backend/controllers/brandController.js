const Brand = require("../models/Brand");

// Create a new brand
exports.createBrand = async (req, res) => {
  try {
    const { name } = req.body;

    const newBrand = new Brand({ name });
    const savedBrand = await newBrand.save();

    res.status(201).json(savedBrand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all brands
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a brand by ID
exports.getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json({ message: "Brand not found." });
    }

    res.json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a brand
exports.updateBrand = async (req, res) => {
  try {
    const { name } = req.body;

    const updated = await Brand.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Brand not found." });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a brand
exports.deleteBrand = async (req, res) => {
  try {
    const deleted = await Brand.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Brand not found." });
    }

    res.json({ message: "Brand deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
