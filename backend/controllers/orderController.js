const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const Notification = require("../models/Notification");
const { sendNotification } = require("../sockets/socket");
const { handleError } = require("../utils/errorHandler");
const paginationHelper = require("../utils/pagination"); // Nếu bạn cần phân trang trong các API
const admin = require("../config/firebaseAdmin"); // Firebase Admin SDK

exports.createOrder = async (req, res) => {
  const { products, shippingAddress, paymentMethod } = req.body;
  const userId = req.user._id.toString();

  try {
    let totalAmount = 0;
    const productList = [];

    // Tính tổng giá trị đơn hàng và kiểm tra sản phẩm
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({ error: "Sản phẩm không tồn tại" });
      }
      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ error: `Sản phẩm ${product.name} không đủ hàng.` });
      }
      totalAmount += product.price * item.quantity;
      productList.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // Tạo đơn hàng
    const order = new Order({
      user: userId,
      products: productList,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });
    await order.save();
    for (const item of products) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }
    // Gửi thông báo cho khách hàng
    const customerNotification = new Notification({
      user: order.user,
      type: "order",
      message: `Bạn vừa tạo thành công đơn hàng ${order._id}.`,
      relatedEntity: order._id,
    });
    await customerNotification.save();

    // Tìm admin
    const adminUser = await User.findOne({ role: "admin" });

    if (adminUser) {
      // Tạo thông báo trong DB
      const adminNotification = new Notification({
        user: adminUser._id,
        type: "order",
        message: `Bạn có đơn hàng ${order._id} mới.`,
        relatedEntity: order._id,
      });
      await adminNotification.save();

      if (adminUser.firebaseToken) {
        try {
          await admin.messaging().send({
            token: adminUser.firebaseToken,
            notification: {
              title: "Đơn hàng mới!",
              body: `Bạn có đơn hàng ${order._id} mới.`,
            },
            data: { orderId: order._id.toString() },
          });

          console.log(`🔔 Push notification đã gửi đến admin thành công!`);
        } catch (error) {
          console.error(`❌ Lỗi khi gửi push notification:`, error);
        }
      } else {
        console.warn(
          `⚠️ Admin chưa có Firebase Token, không thể gửi thông báo.`
        );
      }
    } else {
      console.warn(`⚠️ Không tìm thấy admin, không thể gửi thông báo.`);
    }

    res
      .status(201)
      .json({ message: "Đơn hàng đã được tạo và thông báo đã gửi." });
  } catch (error) {
    console.error(`❌ Lỗi tạo đơn hàng:`, error);
    res.status(500).json({ message: error.message });
  }
};
// exports.createOrder = async (req, res) => {
//     const { products, shippingAddress, paymentMethod } = req.body;
//     const userId = req.user.id;

//     try {
//         let totalAmount = 0;
//         const productList = [];

//         // Tính tổng giá trị đơn hàng và kiểm tra sản phẩm
//         for (const item of products) {
//             const product = await Product.findById(item.product);
//             if (!product) {
//                 return res.status(400).json({ error: 'Sản phẩm không tồn tại' });
//             }
//             totalAmount += product.price * item.quantity;
//             productList.push({
//                 product: product._id,
//                 quantity: item.quantity,
//                 price: product.price,
//             });
//         }

//         // Tạo đơn hàng mới
//         const order = new Order({
//             user: userId,
//             products: productList,
//             totalAmount,
//             shippingAddress,
//             paymentMethod,
//         });

//         await order.save();

//         // Giảm số lượng sản phẩm trong kho
//         for (const item of products) {
//             const product = await Product.findById(item.product);
//             if (product) {
//                 product.stock -= item.quantity;
//                 await product.save();
//             }
//         }

//         return res.status(201).json({ message: 'Đơn hàng đã được tạo thành công', order });
//     } catch (error) {
//         handleError(res, error);
//     }
// };
// x

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
      .populate("products.product");

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
      .populate("products.product");

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
  const orderId = req.params.orderId;
  const { status, products, shippingAddress, paymentMethod } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Đơn hàng không tồn tại" });
    }

    order.status = status || order.status;
    order.products = products || order.products;
    order.shippingAddress = shippingAddress || order.shippingAddress;
    order.paymentMethod = paymentMethod || order.paymentMethod;
    order.updatedAt = Date.now() || order.updatedAt;
    await order.save();
    // await sendOrderNotification(userId, newOrder);

    return res
      .status(201)
      .json({ message: "Trạng thái đơn hàng đã được cập nhật", order });
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
