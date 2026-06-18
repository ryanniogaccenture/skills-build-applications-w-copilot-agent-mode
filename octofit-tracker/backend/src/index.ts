import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import config from './config';
import connectDb from './db';

// Import routes
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', config.corsOrigin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'OctoFit Tracker API is running',
    environment: config.nodeEnv,
    apiUrl: config.apiUrl,
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
    message: `The endpoint ${req.path} does not exist`,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
});

const startServer = async (): Promise<void> => {
  try {
    await connectDb();
    app.listen(config.port, () => {
      console.log(`\n🏋️  OctoFit Tracker API`);
      console.log(`├─ Running on: ${config.apiUrl}`);
      console.log(`├─ Port: ${config.port}`);
      console.log(`├─ Environment: ${config.nodeEnv}`);
      console.log(`├─ MongoDB: ${config.mongoUri}`);
      if (process.env.CODESPACE_NAME) {
        console.log(`├─ Codespace: ${process.env.CODESPACE_NAME}`);
      }
      console.log(`└─ Ready for requests\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
