const cartService = require("../services/cartService");

exports.addToCart = async (req, res) => {
  try {
    const { userId, sessionID, productId, quantity } = req.body;
    let cart;

    if (userId) {
      // User đã login
      cart = await cartService.addToCart(userId, productId, quantity, true); // true = isUser
    } else {
      // Khách chưa login
      cart = await cartService.addToCart(sessionID, productId, quantity, false); // false = isUser
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const { userId, sessionID } = req.body;
    let cart;

    if (userId) {
      cart = await cartService.getCart(userId);
    } else {
      cart = await cartService.getGuestCart(sessionID);
    }

    if (!cart) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateItemQuantity = async (req, res) => {
  try {
    const { userId, sessionID, productId, quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    let cart;
    let isUser = false;
    if (userId) {
      isUser = true;
      cart = await cartService.updateItemQuantity(
        userId,
        productId,
        quantity,
        isUser
      );
    } else {
      cart = await cartService.updateItemQuantity(
        sessionID,
        productId,
        quantity
      );
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.removeItemFromCart = async (req, res) => {
  try {
    const { userId, productId, sessionID } = req.body;
    let cart;
    let isUser = false;
    if (userId) {
      isUser = true;
      cart = await cartService.removeItemFromCart(userId, productId, isUser);
    } else {
      cart = await cartService.removeItemFromCart(sessionID, productId);
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
