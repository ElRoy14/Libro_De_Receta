import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../Schemas/User';

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

passport.use(
    new GoogleStrategy(
        {
            clientID: requireEnv('GOOGLE_CLIENT_ID'),
            clientSecret: requireEnv('GOOGLE_CLIENT_SECRET'),
            callbackURL: requireEnv('GOOGLE_CALLBACK_URL'),
        },
        async function (_accessToken, _refreshToken, profile, done) {
            try {
                const email = profile.emails?.[0]?.value;
                if (!email) {
                    return done(new Error('Google profile did not return an email address'));
                }

                const user = await User.findOneAndUpdate(
                    { googleId: profile.id },
                    {
                        $setOnInsert: {
                            googleId: profile.id,
                            first: profile.name?.givenName,
                            last: profile.name?.familyName,
                            email,
                        },
                    },
                    { upsert: true, new: true }
                );

                return done(null, user);
            } catch (error) {
                return done(error as Error);
            }
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport;
