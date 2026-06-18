import express, { Router, Request, Response, NextFunction } from 'express';
import LeaderboardModel from '../models/leaderboard';

const router: Router = express.Router();

// GET leaderboard
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const leaderboards = await LeaderboardModel.find()
      .populate({ path: 'entries.user', select: '-password' })
      .populate('entries.team')
      .lean();

    res.json({ message: 'Get leaderboard', data: leaderboards, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
});

// GET leaderboard by team
router.get('/team/:teamId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const leaderboards = await LeaderboardModel.find({ 'entries.team': req.params.teamId })
      .populate({ path: 'entries.user', select: '-password' })
      .populate('entries.team')
      .lean();

    res.json({ message: `Get leaderboard for team ${req.params.teamId}`, data: leaderboards, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
});

// GET user rank
router.get('/user/:userId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const leaderboard = await LeaderboardModel.findOne({ 'entries.user': req.params.userId })
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
  } catch (error) {
    next(error);
  }
});

export default router;
