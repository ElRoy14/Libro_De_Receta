import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { container } from "tsyringe";

const router = Router();

const controller = container.resolve(AuthController);

router.get('/auth/google', 
    controller.AuthGoogle.bind(controller)
);

router.get('/auth/google/callback', 
    controller.AuthGoogleCallback.bind(controller)
);

export default router;