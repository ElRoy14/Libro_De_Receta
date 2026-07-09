import { container } from "tsyringe";
import UserRepository from "../../repositories/UserRepository";
import IUserRepository from "../../interfaces/IUserRepository";
import OAuthService from "../../services/OAuthService";
import IOAuthService from "../../interfaces/IOAuthService";
import IAuthService from "../../interfaces/IAuthService";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";
import IUserService from "../../interfaces/IUserService";
import IPasswordHasher from "../../interfaces/IPasswordHasher";
import PasswordHasher from "../../utils/security/PasswordHasher";

container.registerSingleton<IUserRepository>(
    "IUserRepository",
    UserRepository
);

container.registerSingleton<IOAuthService>(
    "IOAuthService",
    OAuthService
);

container.registerSingleton<IAuthService>(
    "IAuthService",
    AuthService
);

container.registerSingleton<IUserService>(
    "IUserService",
    UserService
);

container.registerSingleton<IPasswordHasher>(
    "IPasswordHasher",
    PasswordHasher
)

export { container };