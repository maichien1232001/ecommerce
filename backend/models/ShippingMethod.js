// models/ShippingMethod.js
const mongoose = require('mongoose');

const ShippingMethodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    shippingCost: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    description: {
        type: String,
        trim: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('ShippingMethod', ShippingMethodSchema);
