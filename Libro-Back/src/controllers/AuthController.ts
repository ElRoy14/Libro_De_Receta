import { Router } from 'express';
import passport from 'passport';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

const router = Router();

router.get('/auth/google', passport.authenticate('google',
    {
        scope: ['profile', 'email']
    })
);

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: `${FRONTEND_URL}/login` }),
    function (req, res) {
        req.session.save(() => {
            console.log('Session saved successfully');
            res.redirect(FRONTEND_URL);
        });
    }
);

export default router;