"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const team_1 = __importDefault(require("../models/team"));
const router = express_1.default.Router();
// GET all teams
router.get('/', async (req, res, next) => {
    try {
        const teams = await team_1.default.find().populate('captain', '-password').populate('members', '-password').lean();
        res.json({ message: 'Get all teams', data: teams, timestamp: new Date().toISOString() });
    }
    catch (error) {
        next(error);
    }
});
// GET team by ID
router.get('/:id', async (req, res, next) => {
    try {
        const team = await team_1.default.findById(req.params.id).populate('captain', '-password').populate('members', '-password').lean();
        if (!team) {
            return res.status(404).json({ message: 'Team not found', timestamp: new Date().toISOString() });
        }
        res.json({ message: `Get team ${req.params.id}`, data: team, timestamp: new Date().toISOString() });
    }
    catch (error) {
        next(error);
    }
});
// POST create team
router.post('/', async (req, res, next) => {
    try {
        const team = await team_1.default.create(req.body);
        res.status(201).json({ message: 'Team created', data: team, timestamp: new Date().toISOString() });
    }
    catch (error) {
        next(error);
    }
});
// PUT update team
router.put('/:id', async (req, res, next) => {
    try {
        const team = await team_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .populate('captain', '-password')
            .populate('members', '-password')
            .lean();
        if (!team) {
            return res.status(404).json({ message: 'Team not found', timestamp: new Date().toISOString() });
        }
        res.json({ message: `Team ${req.params.id} updated`, data: team, timestamp: new Date().toISOString() });
    }
    catch (error) {
        next(error);
    }
});
// DELETE team
router.delete('/:id', async (req, res, next) => {
    try {
        const team = await team_1.default.findByIdAndDelete(req.params.id).lean();
        if (!team) {
            return res.status(404).json({ message: 'Team not found', timestamp: new Date().toISOString() });
        }
        res.json({ message: `Team ${req.params.id} deleted`, timestamp: new Date().toISOString() });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=teams.js.map