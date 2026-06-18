"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['member', 'coach', 'admin'], default: 'member' },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team', default: null },
    goals: { type: String, default: '' }
}, {
    timestamps: true
});
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
exports.default = exports.UserModel;
//# sourceMappingURL=user.js.map