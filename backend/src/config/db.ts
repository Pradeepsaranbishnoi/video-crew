import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI: string = process.env.MONGO_URI || '';

export const connectDB = async (): Promise<void> => {
  try {
    if (!MONGO_URI) throw new Error('MONGO_URI not set in .env');

    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (err: any) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};
