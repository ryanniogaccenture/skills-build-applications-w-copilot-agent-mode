import { Document, Types } from 'mongoose';
export interface ITeam extends Document {
    name: string;
    description: string;
    captain: Types.ObjectId | null;
    members: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const TeamModel: import("mongoose").Model<ITeam, {}, {}, {}, Document<unknown, {}, ITeam, {}, import("mongoose").DefaultSchemaOptions> & ITeam & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITeam>;
export default TeamModel;
//# sourceMappingURL=team.d.ts.map