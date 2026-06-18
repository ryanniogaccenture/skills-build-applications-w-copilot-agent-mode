import express, { Router, Request, Response, NextFunction } from 'express';
import UserModel from '../models/user';

const router: Router = express.Router();

// GET all users
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserModel.find().select('-password').lean();
    res.json({ message: 'Get all users', data: users, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
});

// GET user by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.findById(req.params.id).select('-password').lean();
    if (!user) {
      return res.status(404).json({ message: 'User not found', timestamp: new Date().toISOString() });
    }
    res.json({ message: `Get user ${req.params.id}`, data: user, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
});

// POST create user
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.create(req.body);
    const { password, ...safeUser } = user.toObject();
    res.status(201).json({ message: 'User created', data: safeUser, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
});

// PUT update user
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select('-password').lean();
    if (!user) {
      return res.status(404).json({ message: 'User not found', timestamp: new Date().toISOString() });
    }
    res.json({ message: `User ${req.params.id} updated`, data: user, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
});

// DELETE user
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id).lean();
    if (!user) {
      return res.status(404).json({ message: 'User not found', timestamp: new Date().toISOString() });
    }
    res.json({ message: `User ${req.params.id} deleted`, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
});

export default router;
