import connectDb from '../config/database.js';
import User from '../models/user.js';
import Team from '../models/team.js';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Workout from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');
  try {
    await connectDb();

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    // Create users
    const users = await User.create([
      { name: 'Alice Rossi', email: 'alice.rossi@example.com' },
      { name: 'Marco Bianchi', email: 'marco.bianchi@example.com' },
      { name: 'Luca Verdi', email: 'luca.verdi@example.com' },
    ]);

    // Create teams
    const teams = await Team.create([
      { name: 'Milano Runners', members: [users[0]._id, users[1]._id] },
      { name: 'Triathlon Club', members: [users[2]._id] },
    ]);

    // Create workouts
    const workouts = await Workout.create([
      {
        user: users[0]._id,
        name: 'Full Body Circuit',
        exercises: [
          { name: 'Push-ups', reps: 12, sets: 3 },
          { name: 'Squats', reps: 15, sets: 3 },
        ],
      },
      {
        user: users[1]._id,
        name: 'Morning Run',
        exercises: [{ name: 'Run', durationMinutes: 30 }],
      },
    ]);

    // Create activities
    const activities = await Activity.create([
      { user: users[0]._id, type: 'running', durationMinutes: 30, calories: 320, date: new Date() },
      { user: users[1]._id, type: 'cycling', durationMinutes: 45, calories: 420, date: new Date() },
      { user: users[2]._id, type: 'swimming', durationMinutes: 60, calories: 550, date: new Date() },
    ]);

    // Create leaderboard entries
    const leaderboard = await Leaderboard.create([
      { user: users[0]._id, score: 1250 },
      { user: users[1]._id, score: 980 },
      { user: users[2]._id, score: 1500 },
    ]);

    console.log('Seeded users:', users.length);
    console.log('Seeded teams:', teams.length);
    console.log('Seeded workouts:', workouts.length);
    console.log('Seeded activities:', activities.length);
    console.log('Seeded leaderboard entries:', leaderboard.length);

    console.log('Database seeding complete');
    await (await import('mongoose')).disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
