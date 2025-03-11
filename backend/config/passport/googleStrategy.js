const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../../models/User');
require('dotenv').config()

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
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
                        socialLogin: { provider: 'google', providerId: profile.id },
                    });
                }

                done(null, user);
            } catch (error) {
                done(error, null);
            }
        }
    )
);
