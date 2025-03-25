const express = require('express');
const passport = require('passport');
const { register, login, socialLogin, refreshToken, logOut } = require('../controllers/authController');
const verifyTelegramPayload = require('../config/passport/telegramStrategy')
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refreshToken', refreshToken);
router.post('/logout', logOut);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
    '/google/callback',
    passport.authenticate('google', { session: false }),
    async (req, res) => {
        const { id: providerId, emails, displayName: name } = req.user;
        const email = emails[0].value;

        // Gọi socialLogin để xử lý logic chung
        await exports.socialLogin('google')(
            { body: { providerId, email, name } },
            res
        );
    }
);



router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get(
    '/facebook/callback',
    passport.authenticate('facebook', { session: false }),
    async (req, res) => {
        const { id: providerId, emails, displayName: name } = req.user;
        const email = emails[0].value;

        // Gọi socialLogin cho Facebook
        await exports.socialLogin('facebook')(
            { body: { providerId, email, name } },
            res
        );
    }
);


router.get('/twitter', passport.authenticate('twitter'));
router.get(
    '/twitter/callback',
    passport.authenticate('twitter', { session: false }),
    async (req, res) => {
        const { id: providerId, displayName: name } = req.user;
        const email = req.user.emails ? req.user.emails[0].value : null;

        await socialLogin('twitter')(
            { body: { providerId, email, name } },
            res
        );
    }
);

router.post('/telegram', verifyTelegramPayload, async (req, res) => {
    const { id: providerId, first_name: name, username } = req.telegramData;
    const email = `${username}@telegram.com`; // Telegram không cung cấp email, bạn có thể xử lý theo cách này

    await socialLogin('telegram')(
        { body: { providerId, email, name } },
        res
    );
});

router.post('/refresh-token', refreshToken);

module.exports = router;
