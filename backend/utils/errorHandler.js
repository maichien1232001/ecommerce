// utils/errorHandler.js
exports.handleError = (res, error) => {
    console.error(error); // Log lỗi chi tiết để dễ dàng debug
    return res.status(500).json({
        error: error.message || 'Có lỗi xảy ra, vui lòng thử lại sau',
    });
};
