const Category = require("../models/Category");
const slugify = require("slugify");

// Tạo danh mục mới
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Danh mục đã tồn tại" });
    }

    const slug = slugify(name, { lower: true, strict: true });

    const newCategory = new Category({ name, description, slug });
    await newCategory.save();

    res
      .status(201)
      .json({ message: "Tạo danh mục thành công", category: newCategory });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi tạo danh mục", error: error.message });
  }
};

// Lấy tất cả danh mục
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({ categories });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy danh mục", error: error.message });
  }
};

// Cập nhật danh mục
exports.updateCategory = async (req, res) => {
  try {
    // const { categoryId } = req.params;
    const { categoryId, name, description } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    }

    category.name = name || category.name;
    category.description = description || category.description;
    category.slug = slugify(name || category.name, {
      lower: true,
      strict: true,
    });

    await category.save();
    res.status(200).json({ message: "Cập nhật danh mục thành công", category });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi cập nhật danh mục", error: error.message });
  }
};

// Xoá danh mục
exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    }

    await category.deleteOne();
    res.status(200).json({ message: "Xoá danh mục thành công" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi xoá danh mục", error: error.message });
  }
};
