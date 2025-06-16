const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const Cart = require("../models/Cart");
const Notification = require("../models/Notification");
const { sendNotification } = require("../sockets/socket");
const { handleError } = require("../utils/errorHandler");
const paginationHelper = require("../utils/pagination"); // Nếu bạn cần phân trang trong các API
const admin = require("../config/firebaseAdmin"); // Firebase Admin SDK

const getProductId = (item) => {
  if (item.productId) {
    return typeof item.productId === "object"
      ? item.productId._id
      : item.productId;
  }
  return item._id; // Trường hợp sản phẩm đơn lẻ
};

exports.createOrder = async (req, res) => {
  const { products, shippingAddress, paymentMethod } = req.body;
  const productItems = products?.items;
  const totalAmount = products?.total;
  const userId = req?.user?.id; // giữ nguyên ObjectId

  try {
    // Kiểm tra sản phẩm
    const formattedProducts = [];

    for (const item of productItems) {
      const productId = getProductId(item);
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(400).json({ error: "Sản phẩm không tồn tại" });
      }

      const stock = Number(product.stock);
      const quantity = Number(product.stock || products.quantity);

      if (product.status !== "active") {
        return res.status(400).json({
          error: `Sản phẩm "${product.name}" hiện không được bán.`,
        });
      }

      if (isNaN(stock) || isNaN(quantity)) {
        return res.status(400).json({
          error: `Dữ liệu không hợp lệ cho sản phẩm "${product.name}".`,
        });
      }

      if (stock < quantity) {
        return res.status(400).json({
          error: `Sản phẩm "${product.name}" không đủ hàng trong kho.`,
        });
      }

      formattedProducts.push({
        product: product._id,
        quantity: item?.quantity || products?.quantity,
        price: item.price,
      });
    }

    // Tạo đơn hàng
    const order = new Order({
      user: userId,
      products: formattedProducts,
      totalAmount,
      shippingAddress: shippingAddress,
      paymentMethod,
    });

    await order.save();
    // Xoá từng item đã mua khỏi giỏ hàng
    for (const item of productItems) {
      const productId = getProductId(item);
      await Cart.updateOne(
        { userId },
        {
          $pull: {
            items: { productId },
          },
        }
      );
    }

    const updatedCart = await Cart.findOne({ userId }).populate(
      "items.productId"
    );

    // Trừ tồn kho
    for (const item of formattedProducts) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }

    // Thông báo cho khách hàng
    await Notification.create({
      user: userId,
      type: "order",
      message: "Bạn vừa tạo đơn hàng thành công.",
      relatedEntity: order._id,
    });

    // Gửi thông báo cho admin
    const adminUser = await User.findOne({ role: "admin" });

    if (adminUser) {
      await Notification.create({
        user: adminUser._id,
        type: "order",
        message: `Bạn có đơn hàng mới.`,
        relatedEntity: order._id,
      });

      if (adminUser.firebaseToken) {
        try {
          await admin.messaging().send({
            token: adminUser.firebaseToken,
            notification: {
              title: "Đơn hàng mới!",
              body: "Bạn có đơn hàng mới.",
            },
            data: { orderId: order._id.toString() },
          });

          console.log("🔔 Push notification đã gửi đến admin thành công!");
        } catch (error) {
          console.error("❌ Lỗi khi gửi push notification:", error);
        }
      } else {
        console.warn("⚠️ Admin chưa có Firebase Token.");
      }
    } else {
      console.warn("⚠️ Không tìm thấy admin.");
    }

    res.status(201).json({
      message: "Đơn hàng đã được tạo và thông báo đã gửi.",
      updatedCart,
      orderId: order._id,
    });
  } catch (error) {
    console.error("❌ Lỗi tạo đơn hàng:", error);
    res
      .status(500)
      .json({ message: "Tạo đơn hàng thất bại.", error: error.message });
  }
};

// Lấy thông tin đơn hàng của người dùng
exports.getUserOrders = async (req, res) => {
  const userId = req?.user?.id;
  const { page, limit } = req.query;

  try {
    const skip = (page - 1) * limit;

    // Lấy danh sách đơn hàng của người dùng
    const orders = await Order.find({ user: userId })
      .skip(skip)
      .limit(limit)
      .populate("products.product")
      .sort({ createdAt: -1 });

    const totalOrders = await Order.countDocuments({ user: userId });
    const pagination = paginationHelper(page, limit, totalOrders);

    return res.status(200).json({ orders, pagination });
  } catch (error) {
    handleError(res, error);
  }
};

exports.getAllOrders = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Phân trang: mặc định là trang 1 và giới hạn 10 đơn hàng mỗi trang

  try {
    const skip = (page - 1) * limit;
    const orders = await Order.find({})
      .skip(skip)
      .limit(limit)
      .populate("products.product")
      .sort({ createdAt: -1 });

    const totalOrders = await Order.countDocuments({});
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
    const order = await Order.findById(orderId).populate("products.product");
    if (!order) {
      return res.status(404).json({ error: "Đơn hàng không tồn tại" });
    }

    return res.status(200).json(order);
  } catch (error) {
    handleError(res, error);
  }
};

// Cập nhật trạng thái đơn hàng
exports.updateOrderStatus = async (req, res) => {
  const {
    orderId,
    paymentStatus,
    status,
    products,
    shippingAddress,
    paymentMethod,
  } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Đơn hàng không tồn tại" });
    }
    order.paymentStatus = paymentStatus || order.paymentStatus;
    order.status = status || order.status;
    order.products = products || order.products;
    order.shippingAddress = shippingAddress || order.shippingAddress;
    order.paymentMethod = paymentMethod || order.paymentMethod;
    order.updatedAt = Date.now() || order.updatedAt;
    const updatedOrder = await order.save();
    await updatedOrder.populate("products.product");
    // await sendOrderNotification(userId, newOrder);

    return res.status(201).json({
      message: "Trạng thái đơn hàng đã được cập nhật",
      order: updatedOrder,
    });
  } catch (error) {
    handleError(res, error);
  }
};

exports.deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Đơn hàng không tồn tại" });
    }
    await order.deleteOne();
    return res.status(200).json({ message: "Đơn hàng đã được xóa" });
  } catch (error) {
    handleError(res, error);
  }
};
