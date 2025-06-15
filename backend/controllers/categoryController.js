const Category = require("../models/Category");
const slugify = require("slugify");
const paginationHelper = require("../utils/pagination");

// Tạo danh mục mới
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Danh mục đã tồn tại" });
    }

    const slug = slugify(name, { lower: true, strict: true });

    const newCategory = new Category({ name, slug });
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
  const { page = 1, limit = 10, name, all } = req.query;
  try {
    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }
    let categories;
    let totalCount;
    if (!all) {
      categories = await Category.find(filter)
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .sort({ createdAt: -1 });
      totalCount = await Category.countDocuments(filter);
    } else {
      categories = await Category.find().sort({ createdAt: -1 });
    }
    const pagination = paginationHelper(page, limit, totalCount);
    res.status(200).json({ categories, pagination });
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
    const { categoryId, name } = req.body;

    const getName = name?.name;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    }

    category.name = getName || category.name;
    category.slug = slugify(getName || category.name, {
      lower: true,
      strict: true,
    });

    const newCategory = await category.save();
    res.status(200).json({
      message: "Cập nhật danh mục thành công",
      category: newCategory,
    });
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

    const newCategory = await category.deleteOne();
    res
      .status(200)
      .json({ message: "Xoá danh mục thành công", category: newCategory });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi xoá danh mục", error: error.message });
  }
};
