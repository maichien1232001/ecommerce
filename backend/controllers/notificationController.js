const Notification = require('../models/Notification')
exports.getUserNotifications = async (req, res) => {
    const { userId } = req.params;

    try {
        const notifications = await Notification.find({ userId })
            .sort({ createdAt: -1 }) // Sắp xếp theo thời gian tạo
            .limit(10); // Lấy 10 thông báo mới nhất

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
