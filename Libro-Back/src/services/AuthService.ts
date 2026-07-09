import { injectable, inject } from "tsyringe";
import { User } from "../Schemas/User";
import IUserRepository from "../interfaces/IUserRepository";
import IAuthService from "../interfaces/IAuthService";
import { IUser } from "../interfaces/IUser";
import { CreateUserDto } from "../dtos/CreateUserDto";
import IPasswordHasher from "../interfaces/IPasswordHasher";
import { use } from "passport";

@injectable()
export default class AuthService implements IAuthService{

    constructor(
        @inject("IUserRepository")
        private readonly userRepository: IUserRepository,
        @inject("IPasswordHasher")
        private readonly passwordHasher: IPasswordHasher
    ) {}

    async login(req: any, res: any, next: any): Promise<void> {
        // Assuming user is authenticated and user info is available in req.user
        if (req.user) {
            res.status(200).json({ message: 'Login successful', user: req.user });
        } else {
            res.status(401).json({ message: 'User not authenticated' });
        }
    }

    async logout(req: any, res: any, next: any): Promise<void> {
        req.logout((err: any) => {
            if (err) {
                console.error('Error during logout:', err);
                return res.status(500).send('Error during logout');
            }
            req.session.destroy((err: any) => {
                if (err) {
                    console.error('Error destroying session:', err);
                    return res.status(500).send('Error destroying session');
                }
                res.clearCookie('connect.sid');
                res.status(200).json({ message: 'Logout successful' });
            });
        });
    }

    async signup(userDto: CreateUserDto, res: any, next: any): Promise<void> {

        const existing = await this.userRepository.getAllUsers();

        if (existing.some(x => x.email === userDto.email))
            throw new Error("El Usuario ya existe.");

        const hashedPassword = await this.passwordHasher.hash(userDto.password);

        await this.userRepository.createUser({
            ...userDto,
            password: hashedPassword,
        } as IUser);

        res.status(201).json({ message: 'Signup successful', email: userDto.email });
    }
}