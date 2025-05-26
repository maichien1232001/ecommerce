// adminController.js
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { handleError } = require("../utils/errorHandler");

// Lấy tất cả người dùng với phân trang
exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Mặc định trang 1
    const limit = parseInt(req.query.limit) || 10; // Mặc định 10 người dùng mỗi trang
    const skip = (page - 1) * limit; // Tính số bản ghi cần bỏ qua

    const users = await User.find().skip(skip).limit(limit);
    const totalUsers = await User.countDocuments();

    return res.status(200).json({
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    });
  } catch (error) {
    handleError(res, error);
  }
};
