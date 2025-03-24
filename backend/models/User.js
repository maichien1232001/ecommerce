const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String },
        role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
        socialLogin: {
            provider: { type: String, enum: ['google', 'facebook', 'twitter', 'telegram'] },
            providerId: { type: String }, // ID từ mạng xã hội
        },
        shippingAddresses: [
            {
                address: { type: String, required: true },
                city: { type: String, required: true },
                postalCode: { type: String, required: true },
                country: { type: String, required: true }
            }
        ],
        paymentInfo: {
            cardNumber: { type: String, required: true },
            expirationDate: { type: Date, required: true },
            cvv: { type: String, required: true },
            cardHolderName: { type: String, required: true },
            billingAddress: {
                address: { type: String, required: true },
                city: { type: String, required: true },
                postalCode: { type: String, required: true },
                country: { type: String, required: true }
            }
        },
        firebaseToken: { type: String, default: null },
    },
    { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
