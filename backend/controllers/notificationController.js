const Notification = require('../models/Notification')
const User = require('../models/User')
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

exports.saveTokenFirebase = async (req, res) => {
    try {
        const { firebaseToken } = req.body;
        const userId = req.user._id.toString();
        if (!firebaseToken) {
            return res.status(400).json({ error: "Thiếu Firebase Token" });
        }

        await User.findByIdAndUpdate(userId, { firebaseToken });

        res.status(200).json({ message: "Firebase Token đã được lưu." });
    } catch (error) {
        console.error("Lỗi khi lưu Firebase Token:", error);
        res.status(500).json({ error: "Lỗi server" });
    }
}
