const Order = require('../models/Order');
const Product = require('../models/Product');
const { sendNotification } = require('../sockets/socket');
const { handleError } = require('../utils/errorHandler');
const paginationHelper = require('../utils/pagination'); // Nếu bạn cần phân trang trong các API

// Tạo đơn hàng mới
exports.createOrder = async (req, res) => {
    const { products, shippingAddress, paymentMethod } = req.body;
    const userId = req.user.id;

    try {
        let totalAmount = 0;
        const productList = [];

        // Tính tổng giá trị đơn hàng và kiểm tra sản phẩm
        for (const item of products) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(400).json({ error: 'Sản phẩm không tồn tại' });
            }
            totalAmount += product.price * item.quantity;
            productList.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price,
            });
        }

        // Tạo đơn hàng mới
        const order = new Order({
            user: userId,
            products: productList,
            totalAmount,
            shippingAddress,
            paymentMethod,
        });

        await order.save();

        // Giảm số lượng sản phẩm trong kho
        for (const item of products) {
            const product = await Product.findById(item.product);
            if (product) {
                product.stock -= item.quantity;
                await product.save();
            }
        }

        return res.status(201).json({ message: 'Đơn hàng đã được tạo thành công', order });
    } catch (error) {
        handleError(res, error);
    }
};

// Lấy thông tin đơn hàng của người dùng
exports.getUserOrders = async (req, res) => {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query; // Phân trang: mặc định là trang 1 và giới hạn 10 đơn hàng mỗi trang

    try {
        const skip = (page - 1) * limit;

        // Lấy danh sách đơn hàng của người dùng
        const orders = await Order.find({ user: userId })
            .skip(skip)
            .limit(limit)
            .populate('products.product');

        const totalOrders = await Order.countDocuments({ user: userId });
        const pagination = paginationHelper(page, limit, totalOrders);

        return res.status(200).json({ orders, pagination });
    } catch (error) {
        handleError(res, error);
    }
};

// Lấy thông tin chi tiết đơn hàng
exports.getOrderById = async (req, res) => {
    const orderId = req.params.orderId;

    try {
        const order = await Order.findById(orderId).populate('products.product');
        if (!order) {
            return res.status(404).json({ error: 'Đơn hàng không tồn tại' });
        }

        return res.status(200).json(order);
    } catch (error) {
        handleError(res, error);
    }
};

// Cập nhật trạng thái đơn hàng
exports.updateOrderStatus = async (req, res) => {
    const orderId = req.params.orderId;
    const { status } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Đơn hàng không tồn tại' });
        }

        order.status = status;
        order.updatedAt = Date.now();
        await order.save();
        await sendOrderNotification(userId, newOrder);

        return res.status(200).json({ message: 'Trạng thái đơn hàng đã được cập nhật', order });
    } catch (error) {
        handleError(res, error);
    }
};
