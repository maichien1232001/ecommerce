const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const moment = require('moment');

// Hàm hỗ trợ chuyển đổi `period` thành ngày bắt đầu và ngày kết thúc
const getDateRange = (period, startDate, endDate) => {
    const today = moment();
    let start, end;

    switch (period) {
        case 'day':
            start = today.startOf('day');
            end = today.endOf('day');
            break;
        case 'week':
            start = today.startOf('week');
            end = today.endOf('week');
            break;
        case 'month':
            start = today.startOf('month');
            end = today.endOf('month');
            break;
        case 'quarter':
            start = today.startOf('quarter');
            end = today.endOf('quarter');
            break;
        case 'year':
            start = today.startOf('year');
            end = today.endOf('year');
            break;
        case 'custom':
            start = moment(startDate);
            end = moment(endDate);
            break;
        default:
            start = today.startOf('day');
            end = today.endOf('day');
    }

    return { startDate: start.toDate(), endDate: end.toDate() };
};

// Báo cáo doanh thu theo khoảng thời gian
exports.getRevenueReport = async (req, res) => {
    try {
        const { period, startDate, endDate } = req.query;
        const { startDate: dateStart, endDate: dateEnd } = getDateRange(period, startDate, endDate);

        const orders = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: dateStart,
                        $lte: dateEnd
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" }, // nhóm theo tháng
                    totalRevenue: { $sum: "$totalAmount" }
                }
            },
            {
                $sort: { _id: 1 } // Sắp xếp theo tháng
            }
        ]);

        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ error: 'Lỗi khi lấy báo cáo doanh thu' });
    }
};

// Báo cáo số lượng đơn hàng theo khoảng thời gian
exports.getOrderCountReport = async (req, res) => {
    try {
        const { period, startDate, endDate } = req.query;
        const { startDate: dateStart, endDate: dateEnd } = getDateRange(period, startDate, endDate);

        const orders = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: dateStart,
                        $lte: dateEnd
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    orderCount: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ error: 'Lỗi khi lấy báo cáo số lượng đơn hàng' });
    }
};

// Báo cáo sản phẩm bán chạy theo khoảng thời gian
exports.getTopSellingProducts = async (req, res) => {
    try {
        const { period, startDate, endDate } = req.query;
        const { startDate: dateStart, endDate: dateEnd } = getDateRange(period, startDate, endDate);

        const products = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: dateStart,
                        $lte: dateEnd
                    }
                }
            },
            {
                $unwind: "$orderItems" // Tách các sản phẩm trong đơn hàng
            },
            {
                $group: {
                    _id: "$orderItems.productId",
                    totalQuantity: { $sum: "$orderItems.quantity" }
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "productInfo"
                }
            },
            {
                $unwind: "$productInfo"
            },
            {
                $sort: { totalQuantity: -1 }
            },
            {
                $limit: 10 // Lấy top 10 sản phẩm bán chạy
            }
        ]);

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ error: 'Lỗi khi lấy báo cáo sản phẩm bán chạy' });
    }
};

// Báo cáo tổng số người dùng
exports.getUserCountReport = async (req, res) => {
    try {
        const { period, startDate, endDate } = req.query;
        const { startDate: dateStart, endDate: dateEnd } = getDateRange(period, startDate, endDate);

        const userCount = await User.countDocuments({
            createdAt: {
                $gte: dateStart,
                $lte: dateEnd
            }
        });

        return res.status(200).json({ userCount });
    } catch (error) {
        return res.status(500).json({ error: 'Lỗi khi lấy báo cáo người dùng' });
    }
};

// Báo cáo tổng số đơn hàng theo trạng thái
exports.getOrderStatusReport = async (req, res) => {
    try {
        const { period, startDate, endDate } = req.query;
        const { startDate: dateStart, endDate: dateEnd } = getDateRange(period, startDate, endDate);

        const orderStatuses = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: dateStart,
                        $lte: dateEnd
                    }
                }
            },
            {
                $group: {
                    _id: "$status", // nhóm theo trạng thái đơn hàng
                    orderCount: { $sum: 1 }
                }
            }
        ]);

        return res.status(200).json(orderStatuses);
    } catch (error) {
        return res.status(500).json({ error: 'Lỗi khi lấy báo cáo trạng thái đơn hàng' });
    }
};
