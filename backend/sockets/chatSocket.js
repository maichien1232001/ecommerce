const socketIo = require('socket.io');

let io; // Đảm bảo io có thể được truy cập ở các nơi khác

// Khởi tạo socket.io với server
const initSocket = (server) => {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    // Lắng nghe sự kiện 'connection'
    io.on('connection', (socket) => {
        console.log('A user connected');

        // Lắng nghe sự kiện khi người dùng tham gia chat
        socket.on('joinChat', (chatId) => {
            console.log(`User joined chat with ID: ${chatId}`);
            socket.join(chatId);  // Đảm bảo socket.join(chatId) hoạt động
        });

        // Lắng nghe sự kiện khi người dùng gửi tin nhắn
        socket.on('sendMessage', async ({ chatId, message }) => {
            try {
                const chat = await Chat.findById(chatId);
                if (!chat) return socket.emit('error', 'Chat not found');

                const newMessage = {
                    sender: socket.user.id,
                    content: message,
                };

                chat.messages.push(newMessage);
                await chat.save();

                io.to(chatId).emit('receiveMessage', newMessage);
            } catch (error) {
                socket.emit('error', error.message);
            }
        });

        // Lắng nghe sự kiện ngắt kết nối
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};

// Gửi thông báo đến client
const sendNotification = (userId, message) => {
    if (io) {
        io.to(userId).emit('notification', message); // Gửi thông báo đến người dùng có userId tương ứng
    }
};

module.exports = { initSocket, sendNotification };
