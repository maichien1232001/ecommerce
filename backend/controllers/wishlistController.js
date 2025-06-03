// controllers/wishlistController.js
const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");
const { handleError } = require("../utils/errorHandler");

// Thêm sản phẩm vào wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const userId = req?.user?.id;
    const productId = req.body.productId;

    // Tìm wishlist hiện có của user
    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [] });
    }

    const productExists = wishlist.products.some(
      (item) => item.product.toString() === productId
    );
    if (productExists) {
      return res
        .status(400)
        .json({ error: "Sản phẩm đã có trong danh sách yêu thích" });
    }

    // Thêm sản phẩm mới
    wishlist.products.push({ product: productId });
    await wishlist.save();

    // Lấy lại toàn bộ wishlist đã populate
    const fullWishlist = await Wishlist.findOne({ user: userId }).populate(
      "products.product"
    );

    return res.status(201).json({
      message: "Sản phẩm đã được thêm vào danh sách yêu thích",
      wishlist: fullWishlist,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Lấy danh sách sản phẩm yêu thích
exports.getWishlist = async (req, res) => {
  try {
    const userId = req?.user?.id;
    const wishlist = await Wishlist.findOne({ user: userId }).populate(
      "products.product"
    );

    if (!wishlist) {
      return res.status(404).json({ error: "Danh sách yêu thích trống" });
    }

    return res.status(200).json(wishlist);
  } catch (error) {
    handleError(res, error);
  }
};

// Xóa sản phẩm khỏi wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const userId = req?.user?._id; // đảm bảo dùng _id chuẩn
    const productId = req.body.productId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return res
        .status(404)
        .json({ error: "Danh sách yêu thích không tồn tại" });
    }

    wishlist.products = wishlist.products.filter(
      (item) => item.product.toString() !== productId.toString()
    );

    await wishlist.save();

    // Lấy lại wishlist sau khi cập nhật (populate để trả về đầy đủ thông tin product)
    wishlist = await Wishlist.findOne({ user: userId }).populate(
      "products.product"
    );

    return res.status(200).json({
      message: "Sản phẩm đã được xóa khỏi danh sách yêu thích",
      wishlist,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Lỗi server" });
  }
};
