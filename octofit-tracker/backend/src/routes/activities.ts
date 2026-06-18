import express, { Router, Request, Response, NextFunction } from 'express';
import ActivityModel from '../models/activity';

const router: Router = express.Router();

// GET all activities
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activities = await ActivityModel.find()
      .populate('user', '-password')
      .populate('workout')
      .lean();
    res.json({ message: 'Get all activities', data: activities, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
});

// GET activity by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activity = await ActivityModel.findById(req.params.id).populate('user', '-password').populate('workout').lean();
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found', timestamp: new Date().toISOString() });
    }
    res.json({ message: `Get activity ${req.params.id}`, data: activity, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
});

// POST create activity
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activity = await ActivityModel.create(req.body);
    res.status(201).json({ message: 'Activity created', data: activity, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
});

// PUT update activity
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activity = await ActivityModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate('user', '-password')
      .populate('workout')
      .lean();
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found', timestamp: new Date().toISOString() });
    }
    res.json({ message: `Activity ${req.params.id} updated`, data: activity, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
});

// DELETE activity
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activity = await ActivityModel.findByIdAndDelete(req.params.id).lean();
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found', timestamp: new Date().toISOString() });
    }
    res.json({ message: `Activity ${req.params.id} deleted`, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
});

export default router;
