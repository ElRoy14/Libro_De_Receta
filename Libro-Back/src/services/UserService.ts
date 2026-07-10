import { inject, injectable } from "tsyringe";
import { IUser } from "../models/IUser";
import IUserRepository from "../interfaces/IUserRepository";
import IUserService from "../interfaces/IUserService";

@injectable()
export default class UserService implements IUserService {

    constructor(
        @inject("IUserRepository")
        private readonly userRepository: IUserRepository
    ) {}

    async getAllUsers(): Promise<IUser[]> {
        return this.userRepository.getAllUsers();
    }

    async createUser(user: IUser): Promise<void> {
        return this.userRepository.createUser(user);
    }

    async getUserById(id: string): Promise<IUser | null> {
        return this.userRepository.getUserById(id);
    }

    async updateUser(id: string, user: IUser): Promise<void> {
        return this.userRepository.updateUser(id, user);
    }

    async deleteUser(id: string): Promise<void> {
        return this.userRepository.deleteUser(id);
    }

}