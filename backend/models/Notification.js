const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Liên kết với model User
        required: true,
    },
    type: {
        type: String,
        enum: ['order', 'support', 'alert', 'chat', 'other'], // Các loại thông báo có thể là order, support, alert, v.v.
        required: true,
    },
    message: {
        type: String,
        required: true, // Nội dung thông báo
    },
    read: {
        type: Boolean,
        default: false, // Trạng thái đã đọc hay chưa
    },
    createdAt: {
        type: Date,
        default: Date.now, // Thời gian tạo thông báo
    },
    relatedEntity: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'type', // Liên kết với các mục khác tùy vào loại thông báo (ví dụ: đơn hàng, hỗ trợ)
    },
    firebaseToken: {
        type: String,
        required: false, // Firebase token để gửi push notification
    },
});

// Tạo model Notification
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
