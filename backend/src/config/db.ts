import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI: string = process.env.MONGO_URI || 'mongodb://localhost:27017/videocrew_db';

// Test database connection
export const connectDB = async (): Promise<void> => {
  try {
    if (!MONGO_URI) throw new Error('MONGO_URI not set in .env');

    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

// Initialize database (MongoDB creates collections automatically)
export const initDatabase = async (): Promise<void> => {
  try {
    console.log('✅ MongoDB database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
};

export default mongoose;
