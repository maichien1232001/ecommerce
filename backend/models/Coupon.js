// models/Coupon.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const couponSchema = new Schema({
    code: { type: String, required: true, unique: true },  // Mã coupon
    discountType: { type: String, enum: ['percentage', 'fixed'], required: true }, // Loại giảm giá (phần trăm hoặc cố định)
    discountValue: { type: Number, required: true }, // Giá trị giảm giá
    expirationDate: { type: Date, required: true }, // Ngày hết hạn
    usageLimit: { type: Number, default: 1 }, // Số lần sử dụng tối đa của mã giảm giá
    isActive: { type: Boolean, default: true }, // Trạng thái có sử dụng được không
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);
