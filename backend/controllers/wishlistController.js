// controllers/wishlistController.js
const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");
const { handleError } = require("../utils/errorHandler");

// Thêm sản phẩm vào wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const userId = req?.user?.id;
    const productId = req.body.productId;

    // Kiểm tra nếu sản phẩm đã tồn tại trong danh sách yêu thích
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

    wishlist.products.push({ product: productId });
    await wishlist.save();

    return res
      .status(201)
      .json({
        message: "Sản phẩm đã được thêm vào danh sách yêu thích",
        wishlist,
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
    const userId = req?.user?.id;
    const productId = req.body.productId;

    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return res
        .status(404)
        .json({ error: "Danh sách yêu thích không tồn tại" });
    }

    wishlist.products = wishlist.products.filter(
      (item) => item.product.toString() !== productId
    );
    await wishlist.save();

    return res
      .status(200)
      .json({
        message: "Sản phẩm đã được xóa khỏi danh sách yêu thích",
        wishlist,
      });
  } catch (error) {
    handleError(res, error);
  }
};
