"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("./config"));
const db_1 = __importDefault(require("./db"));
// Import routes
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', config_1.default.corsOrigin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'OctoFit Tracker API is running',
        environment: config_1.default.nodeEnv,
        apiUrl: config_1.default.apiUrl,
        timestamp: new Date().toISOString()
    });
});
// API routes
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        path: req.path,
        message: `The endpoint ${req.path} does not exist`,
        timestamp: new Date().toISOString()
    });
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        timestamp: new Date().toISOString()
    });
});
const startServer = async () => {
    try {
        await (0, db_1.default)();
        app.listen(config_1.default.port, () => {
            console.log(`\n🏋️  OctoFit Tracker API`);
            console.log(`├─ Running on: ${config_1.default.apiUrl}`);
            console.log(`├─ Port: ${config_1.default.port}`);
            console.log(`├─ Environment: ${config_1.default.nodeEnv}`);
            console.log(`├─ MongoDB: ${config_1.default.mongoUri}`);
            if (process.env.CODESPACE_NAME) {
                console.log(`├─ Codespace: ${process.env.CODESPACE_NAME}`);
            }
            console.log(`└─ Ready for requests\n`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map