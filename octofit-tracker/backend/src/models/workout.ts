import { Schema, model, Document, Types } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  exercises: { name: string; reps: number; sets: number }[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ExerciseSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    reps: { type: Number, required: true },
    sets: { type: Number, required: true }
  },
  { _id: false }
);

const WorkoutSchema = new Schema<IWorkout>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    durationMinutes: { type: Number, required: true, min: 0 },
    exercises: { type: [ExerciseSchema], required: true },
    tags: { type: [String], default: [] }
  },
  {
    timestamps: true
  }
);

export const WorkoutModel = model<IWorkout>('Workout', WorkoutSchema);

export default WorkoutModel;
