import mongoose, { Schema } from 'mongoose';

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: { createdAt: true, updatedAt: false }, collection: 'users' });

export const User = mongoose.model<IUser>('User', UserSchema);
