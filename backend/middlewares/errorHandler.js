// middlewares/errorHandler.js

const errorHandler = (err, req, res, next) => {
    // Nếu lỗi không có mã trạng thái (statusCode), gán mặc định là 500 (Internal Server Error)
    const statusCode = err.statusCode || 500;

    // Nếu không có thông điệp lỗi, dùng thông điệp mặc định
    const message = err.message || 'Something went wrong';

    // Trả về lỗi dưới dạng JSON cho client
    res.status(statusCode).json({
        success: false,
        message: message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Ẩn stack trace trong môi trường production
    });
};

module.exports = errorHandler;
