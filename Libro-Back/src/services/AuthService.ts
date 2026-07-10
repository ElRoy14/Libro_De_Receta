import { injectable, inject } from "tsyringe";
import { User } from "../Schemas/User";
import IUserRepository from "../interfaces/IUserRepository";
import IAuthService from "../interfaces/IAuthService";
import { IUser } from "../models/IUser";
import { CreateUserDto } from "../dtos/CreateUserDto";
import IPasswordHasher from "../interfaces/IPasswordHasher";
import { use } from "passport";
import { LoginDto } from "../dtos/LoginDto";

@injectable()
export default class AuthService implements IAuthService{

    constructor(
        @inject("IUserRepository")
        private readonly userRepository: IUserRepository,
        @inject("IPasswordHasher")
        private readonly passwordHasher: IPasswordHasher
    ) {}

    async login(loginUserDto: LoginDto, res: any, next: any): Promise<void> {

        const existing = await this.userRepository.getUserByEmail(loginUserDto.email);
        console.log(existing);
        if(!existing)
            throw new Error("El usuario no existe");

        const correctPassword = await this.passwordHasher.verify(existing.password, loginUserDto.password);

        if (correctPassword) {
            res.status(200).json({ message: 'Login successful', user: existing.first });
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
        
        const existing = await this.userRepository.getUserByEmail(userDto.email);

        if(existing)
            throw new Error("El Usuario ya existe.");

        const hashedPassword = await this.passwordHasher.hash(userDto.password);

        await this.userRepository.createUser({
            ...userDto,
            password: hashedPassword,
        } as IUser);

        res.status(201).json({ message: 'Signup successful', email: userDto.email });
    }
}