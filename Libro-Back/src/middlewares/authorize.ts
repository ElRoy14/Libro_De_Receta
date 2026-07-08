import { Express } from "express";
import session from "express-session";
import passport from "passport";

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

    app.use(passport.initialize());
    app.use(passport.session());
}