import mongoose, { Schema } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  createdAt?: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: () => new Date() },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
