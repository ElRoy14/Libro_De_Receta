import { IUser } from "../models/IUser";


export default class IUserService {

    async getAllUsers(): Promise<IUser[]>  { throw new Error("Not implemented");}

    async getUserById(id: string): Promise<IUser | null> { throw new Error("Not implemented");}

    async createUser(user: IUser): Promise<void> { throw new Error("Not implemented");}

    async updateUser(id: string, user: IUser): Promise<void> { throw new Error("Not implemented");}

    async deleteUser(id: string): Promise<void> { throw new Error("Not implemented");}
}