"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const router = express_1.default.Router();
// GET leaderboard
router.get('/', async (req, res, next) => {
    try {
        const leaderboards = await leaderboard_1.default.find()
            .populate({ path: 'entries.user', select: '-password' })
            .populate('entries.team')
            .lean();
        res.json({ message: 'Get leaderboard', data: leaderboards, timestamp: new Date().toISOString() });
    }
    catch (error) {
        next(error);
    }
});
// GET leaderboard by team
router.get('/team/:teamId', async (req, res, next) => {
    try {
        const leaderboards = await leaderboard_1.default.find({ 'entries.team': req.params.teamId })
            .populate({ path: 'entries.user', select: '-password' })
            .populate('entries.team')
            .lean();
        res.json({ message: `Get leaderboard for team ${req.params.teamId}`, data: leaderboards, timestamp: new Date().toISOString() });
    }
    catch (error) {
        next(error);
    }
});
// GET user rank
router.get('/user/:userId', async (req, res, next) => {
    try {
        const leaderboard = await leaderboard_1.default.findOne({ 'entries.user': req.params.userId })
            .populate({ path: 'entries.user', select: '-password' })
            .populate('entries.team')
            .lean();
        if (!leaderboard) {
            return res.status(404).json({ message: 'Leaderboard entry not found', timestamp: new Date().toISOString() });
        }
        const userEntry = leaderboard.entries.find((entry) => entry.user.toString() === req.params.userId);
        if (!userEntry) {
            return res.status(404).json({ message: 'Leaderboard entry not found', timestamp: new Date().toISOString() });
        }
        res.json({ message: `Get rank for user ${req.params.userId}`, data: userEntry, timestamp: new Date().toISOString() });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=leaderboard.js.map