const cartService = require("../services/cartService");

exports.addToCart = async (req, res) => {
    try {
        const { userId } = req.user || {}; // Nếu người dùng đã đăng nhập, lấy userId từ token
        const { productId, quantity } = req.body;
        let cart;

        if (userId) {
            cart = await cartService.addToCart(userId, productId, quantity);
        } else {
            // Nếu chưa đăng nhập, sử dụng sessionId để lưu giỏ hàng
            cart = await cartService.addToCart(req.sessionID, productId, quantity);
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getCart = async (req, res) => {
    try {
        const { userId } = req.user || {};
        let cart;

        if (userId) {
            cart = await cartService.getCart(userId);
        } else {
            cart = await cartService.getGuestCart(req.sessionID);
        }

        if (!cart) {
            return res.status(404).json({ message: "Cart is empty" });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateItemQuantity = async (req, res) => {
    try {
        const { userId } = req.user || {};
        const { productId, quantity } = req.body;

        if (!quantity || quantity <= 0) {
            return res.status(400).json({ message: "Invalid quantity" });
        }

        const cart = await cartService.updateItemQuantity(userId, productId, quantity);
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.removeItemFromCart = async (req, res) => {
    try {
        const { userId } = req.user || {};
        const { productId } = req.params;

        const cart = await cartService.removeItemFromCart(userId, productId);
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
