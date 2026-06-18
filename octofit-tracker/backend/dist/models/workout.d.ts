import { Document, Types } from 'mongoose';
export interface IWorkout extends Document {
    name: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    durationMinutes: number;
    exercises: {
        name: string;
        reps: number;
        sets: number;
    }[];
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const WorkoutModel: import("mongoose").Model<IWorkout, {}, {}, {}, Document<unknown, {}, IWorkout, {}, import("mongoose").DefaultSchemaOptions> & IWorkout & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IWorkout>;
export default WorkoutModel;
//# sourceMappingURL=workout.d.ts.map