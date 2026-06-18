"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const connectDb = async () => {
    const uri = config_1.default.mongoUri;
    console.log(`Connecting to MongoDB at ${uri}`);
    await mongoose_1.default.connect(uri, {
        autoIndex: true,
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 10
    });
    console.log('MongoDB connection established');
};
exports.connectDb = connectDb;
exports.default = exports.connectDb;
//# sourceMappingURL=db.js.map