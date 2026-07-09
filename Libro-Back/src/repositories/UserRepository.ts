import { IUser } from "../interfaces/IUser";
import IUserRepository from "../interfaces/IUserRepository";
import { User } from "../Schemas/User";

export default class UserRepository implements IUserRepository {

    async getAllUsers(): Promise<IUser[]> {
        return User.find().exec();
    }
    async getUserById(id: string): Promise<IUser | null> {
        return User.findById(id).exec();
    }
    async createUser(user: IUser): Promise<void> {
        return await User.create(user)
                   .then(() => { console.log("User created successfully"); })
                   .catch((err) => {
                        throw new Error(`Error creating user: ${err.message}`);
                 });
    }
    async updateUser(id: string, user: IUser): Promise<void> {
        return await User.findByIdAndUpdate(id, user, { new: true }).exec()
            .then((updatedUser) => {
                if (!updatedUser) {
                    throw new Error(`User with id ${id} not found`);
                }
                console.log("User updated successfully");
            })
            .catch((err) => {
                throw new Error(`Error updating user: ${err.message}`);
            });
    }
    async deleteUser(id: string): Promise<void> {
        return await User.findByIdAndDelete(id).exec()
            .then((deletedUser) => {
                if (!deletedUser) {
                    throw new Error(`User with id ${id} not found`);
                }
                console.log("User deleted successfully");
            })
            .catch((err) => {
                throw new Error(`Error deleting user: ${err.message}`);
            });
    }


}