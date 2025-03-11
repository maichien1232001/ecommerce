// adminController.js
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { handleError } = require('../utils/errorHandler');

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
            currentPage: page
        });
    } catch (error) {
        handleError(res, error);
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Mặc định trang 1
        const limit = parseInt(req.query.limit) || 10; // Mặc định 10 sản phẩm mỗi trang
        const skip = (page - 1) * limit; // Tính số bản ghi cần bỏ qua

        const products = await Product.find().skip(skip).limit(limit);
        const totalProducts = await Product.countDocuments();

        return res.status(200).json({
            products,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page
        });
    } catch (error) {
        handleError(res, error);
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Mặc định trang 1
        const limit = parseInt(req.query.limit) || 10; // Mặc định 10 đơn hàng mỗi trang
        const skip = (page - 1) * limit; // Tính số bản ghi cần bỏ qua

        const orders = await Order.find().skip(skip).limit(limit).populate('user products.product');
        const totalOrders = await Order.countDocuments();

        return res.status(200).json({
            orders,
            totalOrders,
            totalPages: Math.ceil(totalOrders / limit),
            currentPage: page
        });
    } catch (error) {
        handleError(res, error);
    }
};