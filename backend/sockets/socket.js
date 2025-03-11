// services/socketService.js
const socketIo = require('socket.io');

let io; // Đảm bảo io có thể được truy cập ở các nơi khác

const initSocket = (server) => {
    // Khởi tạo socket.io với server
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    // Lắng nghe sự kiện 'connection'
    io.on('connection', (socket) => {
        console.log('A user connected');

        // Lắng nghe các sự kiện từ client
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};

// Gửi thông báo đến client
const sendNotification = (userId, message) => {
    // Gửi thông báo cho client với userId tương ứng
    if (io) {
        io.to(userId).emit('notification', message);
    }
};

module.exports = { initSocket, sendNotification };
