const express = require('express');
const { getUserNotifications } = require('../controllers/notificationController');
const router = express.Router();

router.get('/', getUserNotifications);

module.exports = router;