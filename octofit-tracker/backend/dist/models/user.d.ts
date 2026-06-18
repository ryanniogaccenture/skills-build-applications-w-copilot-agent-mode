import { Document, Types } from 'mongoose';
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
export declare const UserModel: import("mongoose").Model<IUser, {}, {}, {}, Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export default UserModel;
//# sourceMappingURL=user.d.ts.map