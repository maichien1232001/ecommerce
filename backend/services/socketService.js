const chatSocket = require('../sockets/chatSocket');
const notificationSocket = require('../sockets/socket');
const userTrackingSocket = require('../sockets/userTrackingSocket');

const initialize = (io) => {
    // Kết nối socket cho các tính năng khác nhau
    chatSocket.sendNotification(io);
    notificationSocket.sendNotification(io);
    userTrackingSocket.sendOrderNotification(io);
}

module.exports = { initialize };
