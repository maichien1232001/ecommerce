const Notification = require('../models/Notification');
const socketService = require('../services/socketService'); // Để sử dụng sendNotification từ socketService

// Hàm gửi thông báo khi có đơn hàng mới
const sendOrderNotification = async (userId, order) => {
    try {
        const message = `Đơn hàng mới của bạn đã được tạo! Mã đơn hàng: ${order.id}.`;

        // Lưu thông báo vào cơ sở dữ liệu
        const notification = await Notification.create({
            userId,
            message,
            isRead: false, // Mặc định là chưa đọc
        });

        // Gửi thông báo qua Socket.IO
        socketService.sendNotification(userId, message);

        console.log(`Thông báo đã được lưu và gửi tới người dùng với ID: ${userId}`);

        return notification;
    } catch (error) {
        console.error('Lỗi khi lưu thông báo:', error);
    }
};

module.exports = { sendOrderNotification };
