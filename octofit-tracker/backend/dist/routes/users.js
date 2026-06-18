"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
// GET all users
router.get('/', async (req, res, next) => {
    try {
        const users = await user_1.default.find().select('-password').lean();
        res.json({ message: 'Get all users', data: users, timestamp: new Date().toISOString() });
    }
    catch (error) {
        next(error);
    }
});
// GET user by ID
router.get('/:id', async (req, res, next) => {
    try {
        const user = await user_1.default.findById(req.params.id).select('-password').lean();
        if (!user) {
            return res.status(404).json({ message: 'User not found', timestamp: new Date().toISOString() });
        }
        res.json({ message: `Get user ${req.params.id}`, data: user, timestamp: new Date().toISOString() });
    }
    catch (error) {
        next(error);
    }
});
// POST create user
router.post('/', async (req, res, next) => {
    try {
        const user = await user_1.default.create(req.body);
        const { password, ...safeUser } = user.toObject();
        res.status(201).json({ message: 'User created', data: safeUser, timestamp: new Date().toISOString() });
    }
    catch (error) {
        next(error);
    }
});
// PUT update user
router.put('/:id', async (req, res, next) => {
    try {
        const user = await user_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select('-password').lean();
        if (!user) {
            return res.status(404).json({ message: 'User not found', timestamp: new Date().toISOString() });
        }
        res.json({ message: `User ${req.params.id} updated`, data: user, timestamp: new Date().toISOString() });
    }
    catch (error) {
        next(error);
    }
});
// DELETE user
router.delete('/:id', async (req, res, next) => {
    try {
        const user = await user_1.default.findByIdAndDelete(req.params.id).lean();
        if (!user) {
            return res.status(404).json({ message: 'User not found', timestamp: new Date().toISOString() });
        }
        res.json({ message: `User ${req.params.id} deleted`, timestamp: new Date().toISOString() });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=users.js.map