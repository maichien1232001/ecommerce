const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../../models/User');
require('dotenv').config()

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: '/auth/facebook/callback',
            profileFields: ['id', 'displayName', 'emails'],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;
                const name = profile.displayName;

                let user = await User.findOne({ email });
                if (!user) {
                    user = await User.create({
                        name,
                        email,
                        socialLogin: { provider: 'facebook', providerId: profile.id },
                    });
                }

                done(null, user);
            } catch (error) {
                done(error, null);
            }
        }
    )
);
