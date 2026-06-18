"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutModel = void 0;
const mongoose_1 = require("mongoose");
const ExerciseSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    reps: { type: Number, required: true },
    sets: { type: Number, required: true }
}, { _id: false });
const WorkoutSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    durationMinutes: { type: Number, required: true, min: 0 },
    exercises: { type: [ExerciseSchema], required: true },
    tags: { type: [String], default: [] }
}, {
    timestamps: true
});
exports.WorkoutModel = (0, mongoose_1.model)('Workout', WorkoutSchema);
exports.default = exports.WorkoutModel;
//# sourceMappingURL=workout.js.map