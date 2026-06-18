"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const activity_1 = __importDefault(require("../models/activity"));
const router = express_1.default.Router();
// GET all activities
router.get('/', async (req, res, next) => {
    try {
        const activities = await activity_1.default.find()
            .populate('user', '-password')
            .populate('workout')
            .lean();
        res.json({ message: 'Get all activities', data: activities, timestamp: new Date().toISOString() });
    }
    catch (error) {
        next(error);
    }
});
// GET activity by ID
router.get('/:id', async (req, res, next) => {
    try {
        const activity = await activity_1.default.findById(req.params.id).populate('user', '-password').populate('workout').lean();
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found', timestamp: new Date().toISOString() });
        }
        res.json({ message: `Get activity ${req.params.id}`, data: activity, timestamp: new Date().toISOString() });
    }
    catch (error) {
        next(error);
    }
});
// POST create activity
router.post('/', async (req, res, next) => {
    try {
        const activity = await activity_1.default.create(req.body);
        res.status(201).json({ message: 'Activity created', data: activity, timestamp: new Date().toISOString() });
    }
    catch (error) {
        next(error);
    }
});
// PUT update activity
router.put('/:id', async (req, res, next) => {
    try {
        const activity = await activity_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .populate('user', '-password')
            .populate('workout')
            .lean();
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found', timestamp: new Date().toISOString() });
        }
        res.json({ message: `Activity ${req.params.id} updated`, data: activity, timestamp: new Date().toISOString() });
    }
    catch (error) {
        next(error);
    }
});
// DELETE activity
router.delete('/:id', async (req, res, next) => {
    try {
        const activity = await activity_1.default.findByIdAndDelete(req.params.id).lean();
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found', timestamp: new Date().toISOString() });
        }
        res.json({ message: `Activity ${req.params.id} deleted`, timestamp: new Date().toISOString() });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=activities.js.map