"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityModel = void 0;
const mongoose_1 = require("mongoose");
const ActivitySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    workout: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Workout', default: null },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    distanceKm: { type: Number, default: 0 },
    date: { type: Date, default: () => new Date() },
    notes: { type: String, default: '' }
}, {
    timestamps: true
});
exports.ActivityModel = (0, mongoose_1.model)('Activity', ActivitySchema);
exports.default = exports.ActivityModel;
//# sourceMappingURL=activity.js.map