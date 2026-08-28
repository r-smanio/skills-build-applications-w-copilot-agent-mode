import express from 'express';
import connectDb from './config/database.js';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());

// Very small CORS helper for local development and Codespaces previews
app.use((req, res, next) => {
  const origin = req.headers.origin || `http://localhost:${port}`;
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

// Codespaces-aware API URL for clients
app.get('/api/config', (_req, res) => {
  const codespace = process.env.CODESPACE_NAME;
  const apiUrl = codespace
    ? `https://${codespace}-${port}.githubpreview.dev`
    : `http://localhost:${port}`;
  res.json({ apiUrl });
});

// Mount routers
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Initialize DB connection (safe to call even if no MongoDB is available)
connectDb();

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening on port ${port}`);
});
