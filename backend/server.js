const http = require('http');
const socketIo = require('socket.io');
const app = require('./app');
const socketService = require('./services/socketService');
require('dotenv').config()

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Thiết lập Socket.IO
socketService.initialize(io);

// Lắng nghe cổng
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});
