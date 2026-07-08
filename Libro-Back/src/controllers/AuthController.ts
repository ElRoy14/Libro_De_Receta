import { Router } from 'express';
import passport from 'passport';
import { login, logout } from '../services/AuthService';
import { AuthGoogle, AuthGoogleCallback } from '../services/OAuthService';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

const router = Router();

router.get('/auth/google', (req, res) => {
    AuthGoogle(req, res);
});

router.get('/auth/google/callback', (req, res) => {
    AuthGoogleCallback(req, res);
});

router.get('/auth/login', (req, res) => {
    login(req, res);
});

router.get('/auth/logout', (req, res) => {
    logout(req, res);
});


export default router;