import passport from 'passport';
import IOAuthService from '../interfaces/IOAuthService';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

export default class OAuthService implements IOAuthService
{

    AuthGoogle(req: any, res: any, next: any) {
        return passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
    }

    AuthGoogleCallback(req: any, res: any, next: any) {
        return passport.authenticate(
            'google',
            { failureRedirect: `${FRONTEND_URL}/login` },
            (err: any, user: any) => {
                if (err) return next(err);
                if (!user) return res.redirect(`${FRONTEND_URL}/login`);

                req.logIn(user, (loginErr: any) => {
                    if (loginErr) return next(loginErr);

                    req.session.save(() => {
                        console.log('Session saved successfully');
                        res.redirect(`${FRONTEND_URL}/menu`);
                    });
                });
            }
        )(req, res, next);
    };

}
