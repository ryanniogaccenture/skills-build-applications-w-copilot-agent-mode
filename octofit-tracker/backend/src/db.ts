import mongoose from 'mongoose';
import config from './config';

export const connectDb = async (): Promise<void> => {
  const uri = config.mongoUri;
  console.log(`Connecting to MongoDB at ${uri}`);

  await mongoose.connect(uri, {
    autoIndex: true,
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 10
  });

  console.log('MongoDB connection established');
};

export default connectDb;
