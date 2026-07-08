import passport from 'passport';


const FRONTEND_URL = process.env.FRONTEND_URL;

export function AuthGoogle(req: any, res: any) {
    passport.authenticate('google', { scope: ['profile', 'email'] });
}

export function AuthGoogleCallback(req: any, res: any) {
    passport.authenticate('google', { failureRedirect: `${FRONTEND_URL}/login` }),
    req.session.save(() => {
        console.log('Session saved successfully');
        res.redirect(FRONTEND_URL);
    });
};