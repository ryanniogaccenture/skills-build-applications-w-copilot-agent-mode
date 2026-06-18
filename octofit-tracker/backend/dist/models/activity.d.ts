import { Document, Types } from 'mongoose';
export interface IActivity extends Document {
    user: Types.ObjectId;
    workout: Types.ObjectId | null;
    type: string;
    durationMinutes: number;
    caloriesBurned: number;
    distanceKm: number;
    date: Date;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const ActivityModel: import("mongoose").Model<IActivity, {}, {}, {}, Document<unknown, {}, IActivity, {}, import("mongoose").DefaultSchemaOptions> & IActivity & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IActivity>;
export default ActivityModel;
//# sourceMappingURL=activity.d.ts.map