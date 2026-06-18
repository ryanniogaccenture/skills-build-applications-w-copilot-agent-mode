import { Schema, model, Document, Types } from 'mongoose';

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

const ActivitySchema = new Schema<IActivity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    workout: { type: Schema.Types.ObjectId, ref: 'Workout', default: null },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    distanceKm: { type: Number, default: 0 },
    date: { type: Date, default: () => new Date() },
    notes: { type: String, default: '' }
  },
  {
    timestamps: true
  }
);

export const ActivityModel = model<IActivity>('Activity', ActivitySchema);

export default ActivityModel;
