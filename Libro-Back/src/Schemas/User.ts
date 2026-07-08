import { Schema, model, Document } from 'mongoose';
import { IUser } from '../interfaces/IUser';

const userSchema = new Schema<IUser>(
    {
        googleId: {
            type: String,
            unique: true,
            sparse: true,
        },
        first: {
            type: String,
            required: true,
            trim: true,
        },
        last: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            select: false,
            required: function (this: IUser) {
                return !this.googleId;
            },
        },
    },
    { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
