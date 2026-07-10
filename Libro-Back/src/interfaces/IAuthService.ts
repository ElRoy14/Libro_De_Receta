import { CreateUserDto } from "../dtos/CreateUserDto";
import { LoginDto } from "../dtos/LoginDto";


export default class IAuthService {
    async login(loginUserDto: LoginDto, res: any, next: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async logout(req: any, res: any, next: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async signup(userDto: CreateUserDto, res: any, next: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
}