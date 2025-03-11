const Cart = require("../models/Cart");
const Product = require("../models/Product");

async function addToCart(userId, productId, quantity) {
    let product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");

    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = new Cart({
            userId,
            items: [{ productId, quantity, price: product.price }],
            totalPrice: product.price * quantity
        });
    } else {
        let itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex >= 0) {
            cart.items[itemIndex].quantity += quantity;
            cart.items[itemIndex].price = cart.items[itemIndex].quantity * product.price;
        } else {
            cart.items.push({ productId, quantity, price: product.price * quantity });
        }
        cart.totalPrice = cart.items.reduce((total, item) => total + item.price, 0);
    }

    await cart.save();
    return cart;
}

async function getCart(userId) {
    let cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) return null;
    return cart;
}

async function getGuestCart(sessionId) {
    let cart = await Cart.findOne({ sessionId }).populate("items.productId");
    if (!cart) return null;
    return cart;
}


async function updateItemQuantity(userId, productId, quantity) {
    let cart = await Cart.findOne({ userId });
    if (!cart) throw new Error("Cart not found");

    let itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex < 0) throw new Error("Item not found in cart");

    cart.items[itemIndex].quantity = quantity;
    cart.items[itemIndex].price = quantity * cart.items[itemIndex].price / cart.items[itemIndex].quantity;

    cart.totalPrice = cart.items.reduce((total, item) => total + item.price, 0);
    await cart.save();

    return cart;
}

async function removeItemFromCart(userId, productId) {
    let cart = await Cart.findOne({ userId });
    if (!cart) throw new Error("Cart not found");

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    cart.totalPrice = cart.items.reduce((total, item) => total + item.price, 0);

    await cart.save();
    return cart;
}

module.exports = { addToCart, getCart, getGuestCart, updateItemQuantity, removeItemFromCart };