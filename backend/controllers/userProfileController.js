// userProfileController.js
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { handleError } = require("../utils/errorHandler");

// Cập nhật thông tin cá nhân
exports.updateProfile = async (req, res) => {
  try {
    const { id, role } = req.user; // Lấy ID người dùng từ middleware (người dùng đã đăng nhập)
    const { name, email, phoneNumber, avatar, gender, phone, dateOfBirth } =
      req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Người dùng không tồn tại" });
    }

    if (role === "admin") {
    }

    // Cập nhật thông tin
    user.name = name || user.name;
    user.email = email || user.email;
    user.avatar = avatar || user.avatar;
    user.gender = gender || user.gender;
    user.phone = phone || user.phone;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    if (role === "admin") {
      user.role = user.role;
    }

    await user.save({ validateModifiedOnly: true });

    return res
      .status(200)
      .json({ message: "Thông tin cá nhân đã được cập nhật", user });
  } catch (error) {
    handleError(res, error);
  }
};

exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Người dùng không tồn tại" });
    }

    // Kiểm tra mật khẩu cũ
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Mật khẩu cũ không chính xác" });
    }

    // Mã hóa mật khẩu mới
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save({ validateModifiedOnly: true });

    return res.status(200).json({ message: "Mật khẩu đã được thay đổi", user });
  } catch (error) {
    handleError(res, error);
  }
};

exports.manageShippingAddresses = async (req, res) => {
  try {
    const userId = req.user.id;
    const { action, addressId, addressData } = req.body;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ error: "Người dùng không tồn tại" });

    switch (action) {
      case "add":
        user.shippingAddresses.push(addressData);
        break;

      case "update":
        const indexToUpdate = user.shippingAddresses.findIndex(
          (addr) => addr._id.toString() === addressId
        );
        if (indexToUpdate === -1)
          return res.status(404).json({ error: "Địa chỉ không tồn tại" });
        Object.assign(user.shippingAddresses[indexToUpdate], addressData);
        break;

      case "delete":
        user.shippingAddresses = user.shippingAddresses.filter(
          (addr) => addr._id.toString() !== addressId
        );
        break;

      case "get":
        return res
          .status(200)
          .json({ shippingAddresses: user.shippingAddresses });

      default:
        return res.status(400).json({ error: "Hành động không hợp lệ" });
    }

    await user.save({ validateModifiedOnly: true });
    return res.status(200).json({
      message: `Địa chỉ đã được ${action}`,
      user,
    });
  } catch (error) {
    handleError(res, error);
  }
};

exports.managePaymentInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    const { action, paymentId, paymentData } = req.body;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ error: "Người dùng không tồn tại" });

    switch (action) {
      case "add":
        user.paymentInfo.push(paymentData);
        break;

      case "update":
        const index = user.paymentInfo.findIndex(
          (p) => p._id.toString() === paymentId
        );
        if (index === -1)
          return res
            .status(404)
            .json({ error: "Không tìm thấy phương thức thanh toán" });
        Object.assign(user.paymentInfo[index], paymentData);
        break;

      case "delete":
        user.paymentInfo = user.paymentInfo.filter(
          (p) => p._id.toString() !== paymentId
        );
        break;

      case "get":
        return res.status(200).json({ paymentInfo: user.paymentInfo });

      default:
        return res.status(400).json({ error: "Hành động không hợp lệ" });
    }

    await user.save({ validateModifiedOnly: true });
    return res.status(200).json({
      message: `Phương thức thanh toán đã được ${action}`,
      user,
    });
  } catch (error) {
    handleError(res, error);
  }
};

exports.getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    res.json(req.user); // Trả về thông tin user đã xác thực từ middleware
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.deleteUserProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);

    await user.deleteOne();

    return res.status(200).json({ message: "User đã được xóa" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};
