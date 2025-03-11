const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
    {
        participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }], // Các user trong cuộc trò chuyện
        messages: [
            {
                sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
                content: { type: String, required: true },
                timestamp: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
