import express, { Router, Request, Response, NextFunction } from 'express';
import WorkoutModel from '../models/workout';

const router: Router = express.Router();

// GET all workouts
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workouts = await WorkoutModel.find().lean();
    res.json({ message: 'Get all workouts', data: workouts, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
});

// GET workout by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workout = await WorkoutModel.findById(req.params.id).lean();
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found', timestamp: new Date().toISOString() });
    }
    res.json({ message: `Get workout ${req.params.id}`, data: workout, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
});

// POST create workout
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workout = await WorkoutModel.create(req.body);
    res.status(201).json({ message: 'Workout created', data: workout, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
});

// PUT update workout
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workout = await WorkoutModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found', timestamp: new Date().toISOString() });
    }
    res.json({ message: `Workout ${req.params.id} updated`, data: workout, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
});

// DELETE workout
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workout = await WorkoutModel.findByIdAndDelete(req.params.id).lean();
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found', timestamp: new Date().toISOString() });
    }
    res.json({ message: `Workout ${req.params.id} deleted`, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
});

// GET personalized workout recommendations
router.get('/recommendations/:userId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workouts = await WorkoutModel.find({ difficulty: 'intermediate' }).limit(3).lean();
    res.json({ message: `Get workout recommendations for user ${req.params.userId}`, data: workouts, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
});

export default router;
