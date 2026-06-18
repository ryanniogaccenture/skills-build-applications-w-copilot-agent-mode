import express, { Router, Request, Response, NextFunction } from 'express';
import TeamModel from '../models/team';

const router: Router = express.Router();

// GET all teams
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teams = await TeamModel.find().populate('captain', '-password').populate('members', '-password').lean();
    res.json({ message: 'Get all teams', data: teams, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
});

// GET team by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const team = await TeamModel.findById(req.params.id).populate('captain', '-password').populate('members', '-password').lean();
    if (!team) {
      return res.status(404).json({ message: 'Team not found', timestamp: new Date().toISOString() });
    }
    res.json({ message: `Get team ${req.params.id}`, data: team, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
});

// POST create team
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const team = await TeamModel.create(req.body);
    res.status(201).json({ message: 'Team created', data: team, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
});

// PUT update team
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const team = await TeamModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate('captain', '-password')
      .populate('members', '-password')
      .lean();
    if (!team) {
      return res.status(404).json({ message: 'Team not found', timestamp: new Date().toISOString() });
    }
    res.json({ message: `Team ${req.params.id} updated`, data: team, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
});

// DELETE team
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const team = await TeamModel.findByIdAndDelete(req.params.id).lean();
    if (!team) {
      return res.status(404).json({ message: 'Team not found', timestamp: new Date().toISOString() });
    }
    res.json({ message: `Team ${req.params.id} deleted`, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
});

export default router;
