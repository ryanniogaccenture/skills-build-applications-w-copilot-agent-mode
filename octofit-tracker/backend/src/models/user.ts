import { Schema, model, Document, Types } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'member' | 'coach' | 'admin';
  team: Types.ObjectId | null;
  goals: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['member', 'coach', 'admin'], default: 'member' },
    team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    goals: { type: String, default: '' }
  },
  {
    timestamps: true
  }
);

export const UserModel = model<IUser>('User', UserSchema);

export default UserModel;
