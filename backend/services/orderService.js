const Order = require('../models/Order');
const Product = require('../models/Product');
const { handleError } = require('../utils/errorHandler');

const createOrder = async (userId, products, shippingAddress, paymentMethod) => {
    let totalAmount = 0;
    const productList = [];

    for (const item of products) {
        const product = await Product.findById(item.product);
        if (!product) {
            throw new Error('Sản phẩm không tồn tại');
        }
        totalAmount += product.price * item.quantity;
        productList.push({ product: product._id, quantity: item.quantity, price: product.price });
    }

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
        product.stock -= item.quantity;
        await product.save();
    }

    return order;
};

const getUserOrders = async (userId) => {
    return await Order.find({ user: userId }).populate('products.product');
};

const getOrderById = async (orderId) => {
    return await Order.findById(orderId).populate('products.product');
};

module.exports = {
    createOrder,
    getUserOrders,
    getOrderById,
};
