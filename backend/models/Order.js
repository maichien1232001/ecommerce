const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Tham chiếu tới người dùng
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      }, // Sản phẩm đã đặt
      quantity: { type: Number, required: true }, // Số lượng
      price: { type: Number, required: true }, // Giá sản phẩm tại thời điểm đặt
    },
  ],
  totalAmount: { type: Number, required: true }, // Tổng giá trị đơn hàng
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipping", "Delivered", "Cancelled"],
    default: "Pending",
  },
  shippingAddress: {
    receiverName: { type: String },
    receiverPhone: { type: String },
    detailAddress: { type: String },
    province: { type: String },
    district: { type: String },
    ward: { type: String },
    postalCode: { type: String },
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },
  paymentMethod: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
