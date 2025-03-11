// controllers/reviewController.js
const Review = require('../models/Review');
const Product = require('../models/Product');
const { handleError } = require('../utils/errorHandler');

// Thêm đánh giá sản phẩm
exports.addReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const userId = req.user.id;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Sản phẩm không tồn tại' });
        }

        const existingReview = await Review.findOne({ user: userId, product: productId });
        if (existingReview) {
            return res.status(400).json({ error: 'Bạn đã đánh giá sản phẩm này rồi' });
        }

        const review = new Review({
            user: userId,
            product: productId,
            rating,
            comment
        });

        await review.save();

        // Tính lại điểm đánh giá trung bình cho sản phẩm
        const reviews = await Review.find({ product: productId });
        const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
        product.rating = averageRating;
        await product.save();

        return res.status(201).json({ message: 'Đánh giá đã được thêm', review });
    } catch (error) {
        handleError(res, error);
    }
};

// Lấy đánh giá của một sản phẩm
exports.getReviews = async (req, res) => {
    try {
        const productId = req.params.productId;
        const reviews = await Review.find({ product: productId }).populate('user', 'name email');

        return res.status(200).json(reviews);
    } catch (error) {
        handleError(res, error);
    }
};

// Cập nhật đánh giá
exports.updateReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const userId = req.user.id;
        const productId = req.params.productId;

        const review = await Review.findOne({ user: userId, product: productId });
        if (!review) {
            return res.status(404).json({ error: 'Đánh giá không tồn tại' });
        }

        review.rating = rating;
        review.comment = comment;
        await review.save();

        // Cập nhật lại điểm đánh giá trung bình của sản phẩm
        const reviews = await Review.find({ product: productId });
        const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
        const product = await Product.findById(productId);
        product.rating = averageRating;
        await product.save();

        return res.status(200).json({ message: 'Đánh giá đã được cập nhật', review });
    } catch (error) {
        handleError(res, error);
    }
};
