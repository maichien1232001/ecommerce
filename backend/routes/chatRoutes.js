const express = require('express');
const { getChatsByUser, createMessage, createChat } = require('../controllers/chatController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', protect, getChatsByUser);
router.post('/message', protect, createMessage);
router.post('/create', protect, createChat);

module.exports = router;
