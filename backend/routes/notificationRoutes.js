const express = require('express');
const { getUserNotifications, saveTokenFirebase } = require('../controllers/notificationController');
const { auth } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', auth, getUserNotifications);

router.post('/save-token', auth, saveTokenFirebase);


module.exports = router;