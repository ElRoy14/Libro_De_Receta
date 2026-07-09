import passport from 'passport';
import IOAuthService from '../interfaces/IOAuthService';

const FRONTEND_URL = process.env.FRONTEND_URL;

export default class OAuthService implements IOAuthService
{

    AuthGoogle(req: any, res: any) {
        passport.authenticate('google', { scope: ['profile', 'email'] });
    }

    AuthGoogleCallback(req: any, res: any) {
        passport.authenticate('google', { failureRedirect: `${FRONTEND_URL}/login` }),
        req.session.save(() => {
            console.log('Session saved successfully');
            res.redirect(FRONTEND_URL);
        });
    };

}
