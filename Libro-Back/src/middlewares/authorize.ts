import { Express } from "express";
import session from "express-session";
import passport from "passport";
import oauthRoutes from "../routes/OAuth.routes";
import authRoutes from "../routes/Auth.routes";

export function configureAuth(app: Express) {
    const sessionSecret = process.env.GOOGLE_CLIENT_SECRET;
    if (!sessionSecret) {
        throw new Error("Missing required environment variable: GOOGLE_CLIENT_SECRET");
    }

    app.use(
        session({
            secret: sessionSecret,
            resave: false,
            saveUninitialized: false,
        })
    );

    app.use(oauthRoutes);
    app.use(authRoutes);

    app.use(passport.initialize());
    app.use(passport.session());
}