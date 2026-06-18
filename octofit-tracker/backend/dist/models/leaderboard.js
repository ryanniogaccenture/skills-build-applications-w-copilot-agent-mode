"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardModel = void 0;
const mongoose_1 = require("mongoose");
const LeaderboardEntrySchema = new mongoose_1.Schema({
    rank: { type: Number, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team', default: null },
    score: { type: Number, required: true },
    activityPoints: { type: Number, required: true }
}, { _id: false });
const LeaderboardSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    entries: { type: [LeaderboardEntrySchema], default: [] }
}, {
    timestamps: true
});
exports.LeaderboardModel = (0, mongoose_1.model)('Leaderboard', LeaderboardSchema);
exports.default = exports.LeaderboardModel;
//# sourceMappingURL=leaderboard.js.map