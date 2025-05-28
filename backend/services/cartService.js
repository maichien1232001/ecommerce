const Cart = require("../models/Cart");
const Product = require("../models/Product");

async function addToCart(identifier, productId, quantity, isUser) {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  const filter = isUser ? { userId: identifier } : { sessionId: identifier };

  let cart = await Cart.findOne(filter);
  if (!cart) {
    cart = new Cart({
      ...(isUser ? { userId: identifier } : { sessionId: identifier }),
      items: [{ productId, quantity, price: product.price }],
      totalPrice: product.price * quantity,
    });
  } else {
    let itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex >= 0) {
      cart.items[itemIndex].quantity += quantity;
      cart.items[itemIndex].price =
        cart.items[itemIndex].quantity * product.price;
    } else {
      cart.items.push({ productId, quantity, price: product.price * quantity });
    }
    cart.totalPrice = cart.items.reduce((total, item) => total + item.price, 0);
  }

  await cart.save();
  await cart.populate("items.productId");
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

async function updateItemQuantity(identifier, productId, quantity, isUser) {
  const filter = isUser ? { userId: identifier } : { sessionId: identifier };

  let cart = await Cart.findOne(filter);
  if (!cart) throw new Error("Cart not found");

  let itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );
  if (itemIndex < 0) throw new Error("Item not found in cart");

  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found"); // Đảm bảo sản phẩm vẫn tồn tại

  cart.items[itemIndex].quantity = quantity;
  cart.items[itemIndex].price = quantity * product.price;

  cart.totalPrice = cart.items.reduce((total, item) => total + item.price, 0);
  await cart.save();

  await cart.populate("items.productId");
  return cart;
}

async function removeItemFromCart(identifier, productId, isUser) {
  const filter = isUser ? { userId: identifier } : { sessionId: identifier };
  let cart = await Cart.findOne(filter);
  if (!cart) throw new Error("Cart not found");

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );
  cart.totalPrice = cart.items.reduce((total, item) => total + item.price, 0);

  await cart.save();
  await cart.populate("items.productId");
  return cart;
}

async function mergeGuestCartToUserCart(sessionId, userId) {
  const guestCart = await Cart.findOne({ sessionId });
  if (!guestCart) return;

  let userCart = await Cart.findOne({ userId });

  if (!userCart) {
    guestCart.userId = userId;
    guestCart.sessionId = null;
    await guestCart.save();
    await guestCart.populate("items.productId");
    return guestCart;
  }

  for (const guestItem of guestCart.items) {
    const existingItem = userCart.items.find(
      (item) => item.productId.toString() === guestItem.productId.toString()
    );
    if (existingItem) {
      existingItem.quantity += guestItem.quantity;
      const product = await Product.findById(guestItem.productId);
      if (product) {
        existingItem.price = existingItem.quantity * product.price;
      }
    } else {
      const product = await Product.findById(guestItem.productId);
      if (product) {
        userCart.items.push({
          productId: guestItem.productId,
          quantity: guestItem.quantity,
          price: guestItem.quantity * product.price,
        });
      }
    }
  }

  userCart.totalPrice = userCart.items.reduce((total, item) => {
    return total + item.price;
  }, 0);

  await userCart.save();
  await Cart.deleteOne({ _id: guestCart._id });
  await userCart.populate("items.productId");
  return userCart;
}

module.exports = {
  addToCart,
  getCart,
  getGuestCart,
  updateItemQuantity,
  removeItemFromCart,
  mergeGuestCartToUserCart,
};
