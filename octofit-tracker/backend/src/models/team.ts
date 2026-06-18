import { Schema, model, Document, Types } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description: string;
  captain: Types.ObjectId | null;
  members: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const TeamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    captain: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    timestamps: true
  }
);

export const TeamModel = model<ITeam>('Team', TeamSchema);

export default TeamModel;
