"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamModel = void 0;
const mongoose_1 = require("mongoose");
const TeamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    captain: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', default: null },
    members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }]
}, {
    timestamps: true
});
exports.TeamModel = (0, mongoose_1.model)('Team', TeamSchema);
exports.default = exports.TeamModel;
//# sourceMappingURL=team.js.map