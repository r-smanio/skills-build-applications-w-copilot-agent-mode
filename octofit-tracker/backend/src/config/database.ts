import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export default async function connectDb() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');
  } catch (error) {
    console.error('Error connecting to octofit_db:', error);
    // Do not exit the process here; let the caller decide.
  }

  const db = mongoose.connection as unknown as {
    on(event: string, listener: (...args: unknown[]) => void): void;
  };

  db.on('error', console.error.bind(console, 'connection error:'));

  return db;
}
