const Chat = require('../models/Chat');
const User = require('../models/User');

exports.getChatsByUser = async (req, res) => {
    try {
        const chats = await Chat.find({ participants: req.user.id }).populate('participants', 'name email');
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createMessage = async (req, res) => {
    const { chatId, content } = req.body;

    try {
        const chat = await Chat.findById(chatId);

        if (!chat) return res.status(404).json({ message: 'Chat not found' });

        const newMessage = {
            sender: req.user.id,
            content,
        };

        chat.messages.push(newMessage);
        await chat.save();

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createChat = async (req, res) => {
    const { participantId } = req.body;

    try {
        const participant = await User.findById(participantId);
        if (!participant) return res.status(404).json({ message: 'User not found' });

        const existingChat = await Chat.findOne({
            participants: { $all: [req.user.id, participantId] },
        });

        if (existingChat) return res.status(200).json(existingChat);

        const chat = await Chat.create({
            participants: [req.user.id, participantId],
        });

        res.status(201).json(chat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
