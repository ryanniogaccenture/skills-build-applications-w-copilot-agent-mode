"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../models/user"));
const team_1 = __importDefault(require("../models/team"));
const activity_1 = __importDefault(require("../models/activity"));
const workout_1 = __importDefault(require("../models/workout"));
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
// Seed the octofit_db database with test data
dotenv_1.default.config();
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const seedingData = async () => {
    console.log('Starting seed script');
    console.log(`Connecting to ${mongoUri}`);
    await mongoose_1.default.connect(mongoUri, {
        autoIndex: true,
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 10
    });
    console.log('Connected to MongoDB for seed');
    await Promise.all([
        user_1.default.deleteMany({}),
        team_1.default.deleteMany({}),
        activity_1.default.deleteMany({}),
        workout_1.default.deleteMany({}),
        leaderboard_1.default.deleteMany({})
    ]);
    const users = await user_1.default.insertMany([
        {
            firstName: 'Ava',
            lastName: 'Waters',
            email: 'ava.waters@example.com',
            password: 'password123',
            role: 'member',
            goals: 'Run a half marathon and improve strength'
        },
        {
            firstName: 'Mia',
            lastName: 'Jordan',
            email: 'mia.jordan@example.com',
            password: 'securepass',
            role: 'coach',
            goals: 'Coach teams to better performance'
        },
        {
            firstName: 'Leo',
            lastName: 'Kim',
            email: 'leo.kim@example.com',
            password: 'fit4life',
            role: 'member',
            goals: 'Increase endurance and flexibility'
        }
    ]);
    const teams = await team_1.default.insertMany([
        {
            name: 'Marathon Masters',
            description: 'Dedicated to long-distance road and trail running',
            captain: users[1]._id,
            members: [users[0]._id, users[2]._id]
        }
    ]);
    await user_1.default.updateMany({ _id: { $in: [users[0]._id, users[2]._id] } }, { team: teams[0]._id });
    const workouts = await workout_1.default.insertMany([
        {
            name: 'Endurance Builder',
            description: 'A long steady-state run with mobility work',
            difficulty: 'intermediate',
            durationMinutes: 60,
            exercises: [
                { name: 'Steady run', reps: 1, sets: 1 },
                { name: 'Leg swings', reps: 15, sets: 2 },
                { name: 'Hip openers', reps: 12, sets: 2 }
            ],
            tags: ['running', 'endurance']
        },
        {
            name: 'Strength Circuit',
            description: 'Lower-body circuit with core stabilization',
            difficulty: 'beginner',
            durationMinutes: 45,
            exercises: [
                { name: 'Squats', reps: 12, sets: 3 },
                { name: 'Walking lunges', reps: 10, sets: 3 },
                { name: 'Plank', reps: 1, sets: 3 }
            ],
            tags: ['strength', 'core']
        }
    ]);
    const activities = await activity_1.default.insertMany([
        {
            user: users[0]._id,
            workout: workouts[0]._id,
            type: 'run',
            durationMinutes: 62,
            caloriesBurned: 560,
            distanceKm: 10.2,
            date: new Date(new Date().setDate(new Date().getDate() - 1)),
            notes: 'Felt strong on the final kilometer.'
        },
        {
            user: users[2]._id,
            workout: workouts[1]._id,
            type: 'strength',
            durationMinutes: 46,
            caloriesBurned: 420,
            distanceKm: 0,
            date: new Date(new Date().setDate(new Date().getDate() - 2)),
            notes: 'Improved squat depth and balance.'
        }
    ]);
    await leaderboard_1.default.create({
        name: 'Weekly Performance',
        entries: [
            { rank: 1, user: users[0]._id, team: teams[0]._id, score: 1120, activityPoints: 280 },
            { rank: 2, user: users[2]._id, team: teams[0]._id, score: 980, activityPoints: 245 }
        ]
    });
    console.log('Seeded sample users:', users.length);
    console.log('Seeded sample teams:', teams.length);
    console.log('Seeded sample workouts:', workouts.length);
    console.log('Seeded sample activities:', activities.length);
    console.log('Seeded leaderboard entries for octofit_db');
    await mongoose_1.default.disconnect();
    console.log('Seed complete, disconnected from MongoDB');
};
seedingData()
    .catch((error) => {
    console.error('Seed script error:', error);
    process.exit(1);
})
    .finally(() => {
    process.exit(0);
});
//# sourceMappingURL=seed.js.map