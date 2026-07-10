export interface IUser extends Document {
    googleId?: string;
    id?: string;
    first: string;
    last: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt?: Date;
}