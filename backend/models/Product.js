const mongoose = require('mongoose');

const specificationSchema = new mongoose.Schema({
    cpu: { type: String },
    ram: { type: String },
    storage: { type: String },
    screen: { type: String },
    battery: { type: String },
    camera: { type: String },
    operatingSystem: { type: String },
    color: { type: String },
    weight: { type: String },
    connectivity: { type: String },
    others: { type: String },
});

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        images: [{ type: String }],
        stock: { type: Number, default: 0 },
        rating: { type: Number, default: 0 },
        specifications: {
            laptop: specificationSchema,
            smartphone: specificationSchema,
            tablet: specificationSchema,
            desktop: specificationSchema,
        },
        reviews: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                comment: String,
                rating: { type: Number, min: 1, max: 5 },
                createdAt: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
