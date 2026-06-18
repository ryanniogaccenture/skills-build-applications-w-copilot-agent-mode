import { Schema, model, Document, Types } from 'mongoose';

export interface ILeaderboardEntry {
  rank: number;
  user: Types.ObjectId;
  team: Types.ObjectId | null;
  score: number;
  activityPoints: number;
}

export interface ILeaderboard extends Document {
  name: string;
  entries: ILeaderboardEntry[];
  createdAt: Date;
  updatedAt: Date;
}

const LeaderboardEntrySchema = new Schema<ILeaderboardEntry>(
  {
    rank: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    score: { type: Number, required: true },
    activityPoints: { type: Number, required: true }
  },
  { _id: false }
);

const LeaderboardSchema = new Schema<ILeaderboard>(
  {
    name: { type: String, required: true, trim: true },
    entries: { type: [LeaderboardEntrySchema], default: [] }
  },
  {
    timestamps: true
  }
);

export const LeaderboardModel = model<ILeaderboard>('Leaderboard', LeaderboardSchema);

export default LeaderboardModel;
