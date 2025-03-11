const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../../models/User');
require('dotenv').config()

passport.use(
    new TwitterStrategy(
        {
            consumerKey: process.env.TWITTER_CONSUMER_KEY,
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
            callbackURL: '/auth/twitter/callback',
        },
        async (token, tokenSecret, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value || `${profile.username}@twitter.com`;
                const name = profile.displayName || profile.username;

                let user = await User.findOne({ email });
                if (!user) {
                    user = await User.create({
                        name,
                        email,
                        socialLogin: { provider: 'twitter', providerId: profile.id },
                    });
                }

                done(null, user);
            } catch (error) {
                done(error, null);
            }
        }
    )
);
