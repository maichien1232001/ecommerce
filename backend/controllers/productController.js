const Product = require("../models/Product");
const multer = require("multer");
const xlsx = require("xlsx");
const cloudinaryService = require("../services/cloudinaryService");
const paginationHelper = require("../utils/pagination");
const Category = require("../models/Category");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.importProducts = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Vui lòng tải lên file Excel!" });
    }
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const products = [];

    for (const row of data) {
      const categoryName = row["Danh mục"];
      const category = await Category.findOne({ name: categoryName });
      if (!category) continue; // hoặc push error log
      const specType = row["Thông số kỹ thuật"];
      products.push({
        name: row["Tên sản phẩm"],
        description: row["Mô tả"],
        price: row["Giá"],
        category: category._id,
        stock: row["Tồn kho"],
        images: row["Hình ảnh"] ? row["Hình ảnh"].split(",") : [],
        specifications: {
          [specType]: {
            cpu: row["CPU"],
            ram: row["RAM"],
            storage: row["Bộ nhớ"],
            screen: row["Màn hình"],
            battery: row["Pin"],
            operatingSystem: row["Hệ điều hành"],
            color: row["Màu sắc"],
            weight: row["Trọng lượng"],
            connectivity: row["Kết nối"],
            others: row["Khác"],
          },
        },
      });
    }

    await Product.insertMany(products);
    res
      .status(201)
      .json({ message: "Nhập dữ liệu thành công!", data: products });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi nhập dữ liệu!", error: error.message });
  }
};

// Tạo sản phẩm mới
exports.createProduct = async (req, res) => {
  const { name, description, price, category, stock, specifications, images } =
    req.body;

  try {
    const foundCategory = await Category.findById(category);
    if (!foundCategory)
      return res.status(400).json({ message: "Category không tồn tại!" });
    const newProduct = new Product({
      name,
      description,
      price,
      category: foundCategory._id,
      stock,
      images,
      specifications,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, description, price, category, stock, specifications } =
    req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (category) {
      const foundCategory = await Category.findById(category);
      if (!foundCategory)
        return res.status(400).json({ message: "Category không tồn tại!" });
      product.category = foundCategory._id;
    }

    if (req.files?.images) {
      const images = [];
      for (let image of req.files.images) {
        const uploadedImage = await cloudinaryService.uploadImage(image.path);
        images.push(uploadedImage.secure_url);
      }
      product.images = images;
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.specifications = specifications || product.specifications;

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    res.status(200).json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy danh sách sản phẩm với phân trang và tìm kiếm
exports.getProducts = async (req, res) => {
  const { page = 1, limit = 10, search = "", category = "" } = req.query;

  try {
    const filter = {};
    if (search) filter.name = { $regex: search, $options: "i" };
    if (category) filter.category = category; // truyền ObjectId từ frontend

    const products = await Product.find(filter)
      .populate("category", "name slug") // nếu cần
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalCount = await Product.countDocuments(filter);
    const pagination = paginationHelper(page, limit, totalCount);

    res.status(200).json({ products, pagination });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId).populate(
      "category",
      "name slug"
    );
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
