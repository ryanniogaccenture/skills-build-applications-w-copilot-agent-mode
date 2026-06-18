import { Document, Types } from 'mongoose';
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
export declare const LeaderboardModel: import("mongoose").Model<ILeaderboard, {}, {}, {}, Document<unknown, {}, ILeaderboard, {}, import("mongoose").DefaultSchemaOptions> & ILeaderboard & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ILeaderboard>;
export default LeaderboardModel;
//# sourceMappingURL=leaderboard.d.ts.map