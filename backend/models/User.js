const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    avatar: { type: String, default: null },
    gender: { type: String, default: null },
    phone: { type: String, default: null },
    dateOfBirth: { type: Date, default: null },
    socialLogin: {
      provider: {
        type: String,
        enum: ["google", "facebook", "twitter", "telegram"],
      },
      providerId: { type: String }, // ID từ mạng xã hội
    },
    shippingAddresses: [
      {
        receiverName: { type: String },
        receiverPhone: { type: String },
        detailAddress: { type: String },
        province: { type: String },
        district: { type: String },
        ward: { type: String },
        postalCode: { type: String },
        isDefault: { type: Boolean, default: false }, // Đánh dấu địa chỉ mặc định
      },
    ],
    paymentInfo: [
      {
        cardNumber: { type: String },
        expirationDate: { type: Date },
        cvv: { type: String },
        cardHolderName: { type: String },
        paymentMethod: { type: String },
        billingAddress: {
          province: { type: String },
          district: { type: String },
          ward: { type: String },
          postalCode: { type: String },
          specificAddress: { type: String },
        },
        isDefault: { type: Boolean, default: false }, // Đánh dấu thẻ mặc định
      },
    ],

    firebaseToken: { type: String, default: null },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
