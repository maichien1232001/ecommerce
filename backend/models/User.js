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
    },
    { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
