// controllers/couponController.js
const Coupon = require('../models/Coupon');
const { handleError } = require('../utils/errorHandler');

// Tạo mã giảm giá mới
exports.createCoupon = async (req, res) => {
    try {
        const { code, discountType, discountValue, expirationDate, usageLimit } = req.body;

        // Kiểm tra xem mã giảm giá có tồn tại không
        const existingCoupon = await Coupon.findOne({ code });
        if (existingCoupon) {
            return res.status(400).json({ error: 'Mã giảm giá đã tồn tại' });
        }

        // Tạo mã giảm giá mới
        const coupon = new Coupon({
            code,
            discountType,
            discountValue,
            expirationDate,
            usageLimit,
        });

        await coupon.save();
        return res.status(201).json({ message: 'Mã giảm giá đã được tạo', coupon });
    } catch (error) {
        handleError(res, error);
    }
};

// Lấy danh sách mã giảm giá
exports.getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find().sort({ createdAt: -1 });
        return res.status(200).json(coupons);
    } catch (error) {
        handleError(res, error);
    }
};

// Áp dụng mã giảm giá
exports.applyCoupon = async (req, res) => {
    try {
        const { couponCode } = req.body;
        const coupon = await Coupon.findOne({ code: couponCode });

        if (!coupon) {
            return res.status(404).json({ error: 'Mã giảm giá không tồn tại' });
        }

        // Kiểm tra ngày hết hạn
        if (new Date() > new Date(coupon.expirationDate)) {
            return res.status(400).json({ error: 'Mã giảm giá đã hết hạn' });
        }

        // Kiểm tra trạng thái mã giảm giá
        if (!coupon.isActive) {
            return res.status(400).json({ error: 'Mã giảm giá không hợp lệ' });
        }

        // Kiểm tra số lần sử dụng
        if (coupon.usageLimit <= 0) {
            return res.status(400).json({ error: 'Mã giảm giá đã hết lượt sử dụng' });
        }

        // Giảm giá
        const discountValue = coupon.discountValue;
        const discountType = coupon.discountType; // 'percentage' hoặc 'fixed'

        // Cập nhật số lần sử dụng
        coupon.usageLimit -= 1;
        await coupon.save();

        return res.status(200).json({ message: 'Mã giảm giá hợp lệ', discountValue, discountType });
    } catch (error) {
        handleError(res, error);
    }
};

// Cập nhật mã giảm giá
exports.updateCoupon = async (req, res) => {
    const couponId = req.params.couponId;
    try {
        const { code, discountType, discountValue, expirationDate, usageLimit, isActive } = req.body;

        const coupon = await Coupon.findById(couponId);

        if (!coupon) {
            return res.status(404).json({ error: 'Mã giảm giá không tồn tại' });
        }

        coupon.code = code || coupon.code;
        coupon.discountType = discountType || coupon.discountType;
        coupon.discountValue = discountValue || coupon.discountValue;
        coupon.expirationDate = expirationDate || coupon.expirationDate;
        coupon.usageLimit = usageLimit || coupon.usageLimit;
        coupon.isActive = isActive !== undefined ? isActive : coupon.isActive;

        await coupon.save();

        return res.status(200).json({ message: 'Mã giảm giá đã được cập nhật', coupon });
    } catch (error) {
        handleError(res, error);
    }
};

// Xóa mã giảm giá
exports.deleteCoupon = async (req, res) => {
    try {
        const couponId = req.params.couponId;

        const coupon = await Coupon.findById(couponId);
        if (!coupon) {
            return res.status(404).json({ error: 'Mã giảm giá không tồn tại' });
        }

        await coupon.deleteOne();
        return res.status(200).json({ message: 'Mã giảm giá đã được xóa' });
    } catch (error) {
        handleError(res, error);
    }
};

exports.getCouponById = async (req, res) => {
    const couponId = req.params.couponId;

    try {
        const coupon = await Coupon.findById(couponId);
        if (!coupon) {
            return res.status(404).json({ error: 'Đơn hàng không tồn tại' });
        }

        return res.status(200).json(coupon);
    } catch (error) {
        handleError(res, error);
    }
};
