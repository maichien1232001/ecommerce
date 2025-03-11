const crypto = require('crypto');
require('dotenv').config()

const verifyTelegramPayload = (req, res, next) => {
    const { hash, ...data } = req.body;

    if (!hash) {
        return res.status(400).json({ message: 'Hash is missing in the payload' });
    }

    const secret = crypto.createHash('sha256').update(process.env.TELEGRAM_BOT_TOKEN).digest();

    const checkString = Object.keys(data)
        .sort()
        .map((key) => `${key}=${data[key]}`)
        .join('\n');

    const hmac = crypto.createHmac('sha256', secret).update(checkString).digest('hex');

    if (hmac !== hash) {
        return res.status(400).json({ message: 'Invalid payload: Hash does not match' });
    }

    req.telegramData = data; // Gắn dữ liệu Telegram đã xác minh vào `req`
    next();
};

module.exports = verifyTelegramPayload;
