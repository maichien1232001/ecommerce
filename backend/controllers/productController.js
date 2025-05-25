const Product = require("../models/Product");
const multer = require("multer");
const xlsx = require("xlsx");
const cloudinaryService = require("../services/cloudinaryService");
const paginationHelper = require("../utils/pagination");
const Category = require("../models/Category");
const { buildProductFilter } = require("../utils/buildProductFilter");

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
      if (!category) continue;

      const specType = row["Loại sản phẩm"]?.toLowerCase();

      products.push({
        name: row["Tên sản phẩm"],
        description: row["Mô tả"],
        price: row["Giá"],
        category: category._id,
        stock: row["Tồn kho"] || 0,
        images: row["Hình ảnh"] ? row["Hình ảnh"].split(",") : [],
        status: row["Trạng thái"],
        specialTag: row["Thẻ đặc biệt"],
        brand:
          typeof row["Thương hiệu"] === "string"
            ? row["Thương hiệu"].toLowerCase()
            : null,
        specifications: {
          [specType]: {
            cpu: row["CPU"],
            ram: row["RAM"],
            storage: row["Bộ nhớ"],
            screen: row["Màn hình"],
            battery: row["Pin"],
            camera: row["Camera"],
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
  const {
    name,
    description,
    price,
    category,
    stock,
    specifications,
    images,
    brand,
    specialTag,
    status,
  } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category: category._id,
      stock,
      images,
      specifications,
      brand: brand._id,
      specialTag: specialTag.value,
      status: status.value,
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
  const {
    name,
    description,
    price,
    category,
    stock,
    specifications,
    images, // đã upload xong, là mảng các object { url, public_id }
    brand,
    specialTag,
    status,
  } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Gán thẳng danh sách ảnh mới từ body
    if (images && Array.isArray(images)) {
      product.images = images;
    }

    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.category = category ?? product.category;
    product.stock = stock ?? product.stock;
    product.brand = brand ?? product.brand;
    product.specialTag = specialTag?.value || product.specialTag;
    product.status = status?.value || product.status;
    product.specifications = specifications ?? product.specifications;

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.error("Update error:", error);
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
  const {
    page,
    limit,
    name,
    priceMin,
    priceMax,
    createdFrom,
    createdTo,
    updatedFrom,
    updatedTo,
    inStock,
    category,
    specialTag,
    status,
    brand,
  } = req.query;

  try {
    const filter = buildProductFilter({
      name,
      priceMin,
      priceMax,
      createdFrom,
      createdTo,
      updatedFrom,
      updatedTo,
      inStock,
      category,
      specialTag,
      status,
      brand,
    });

    const products = await Product.find(filter)
      .populate("category", "name slug")
      .skip((page - 1) * limit)
      .limit(Number(limit))
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
