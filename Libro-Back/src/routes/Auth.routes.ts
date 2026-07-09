import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { container } from "tsyringe";
import { validate } from "../middlewares/validate";
import { createUserSchema } from "../validators/user.validator";

const router = Router();

const controller = container.resolve(AuthController);

router.get('/auth/login', 
    controller.login
);

router.get('/auth/logout', 
    controller.logout
);

router.post('/auth/signup',
    validate(createUserSchema),
    controller.signup
)

export default router;