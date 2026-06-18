"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workout_1 = __importDefault(require("../models/workout"));
const router = express_1.default.Router();
// GET all workouts
router.get('/', async (req, res, next) => {
    try {
        const workouts = await workout_1.default.find().lean();
        res.json({ message: 'Get all workouts', data: workouts, timestamp: new Date().toISOString() });
    }
    catch (error) {
        next(error);
    }
});
// GET workout by ID
router.get('/:id', async (req, res, next) => {
    try {
        const workout = await workout_1.default.findById(req.params.id).lean();
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found', timestamp: new Date().toISOString() });
        }
        res.json({ message: `Get workout ${req.params.id}`, data: workout, timestamp: new Date().toISOString() });
    }
    catch (error) {
        next(error);
    }
});
// POST create workout
router.post('/', async (req, res, next) => {
    try {
        const workout = await workout_1.default.create(req.body);
        res.status(201).json({ message: 'Workout created', data: workout, timestamp: new Date().toISOString() });
    }
    catch (error) {
        next(error);
    }
});
// PUT update workout
router.put('/:id', async (req, res, next) => {
    try {
        const workout = await workout_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found', timestamp: new Date().toISOString() });
        }
        res.json({ message: `Workout ${req.params.id} updated`, data: workout, timestamp: new Date().toISOString() });
    }
    catch (error) {
        next(error);
    }
});
// DELETE workout
router.delete('/:id', async (req, res, next) => {
    try {
        const workout = await workout_1.default.findByIdAndDelete(req.params.id).lean();
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found', timestamp: new Date().toISOString() });
        }
        res.json({ message: `Workout ${req.params.id} deleted`, timestamp: new Date().toISOString() });
    }
    catch (error) {
        next(error);
    }
});
// GET personalized workout recommendations
router.get('/recommendations/:userId', async (req, res, next) => {
    try {
        const workouts = await workout_1.default.find({ difficulty: 'intermediate' }).limit(3).lean();
        res.json({ message: `Get workout recommendations for user ${req.params.userId}`, data: workouts, timestamp: new Date().toISOString() });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=workouts.js.map