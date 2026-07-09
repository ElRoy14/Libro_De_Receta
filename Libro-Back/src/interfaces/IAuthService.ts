import { CreateUserDto } from "../dtos/CreateUserDto";


export default class IAuthService {
    async login(req: any, res: any, next: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async logout(req: any, res: any, next: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async signup(userDto: CreateUserDto, res: any, next: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
}