import { Router } from 'express';
import Leaderboard from '../models/leaderboard.js';

const router = Router();

router.get('/', async (_req, res) => {
  const list = await Leaderboard.find().populate('user').sort({ score: -1 }).lean();
  res.json(list);
});

router.post('/', async (req, res) => {
  try {
    const { user, score } = req.body;
    if (!user || typeof score !== 'number') return res.status(400).json({ error: 'user and numeric score required' });
    const e = await Leaderboard.create({ user, score });
    res.status(201).json(e);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const e = await Leaderboard.findById(req.params.id).populate('user').lean();
  if (!e) return res.sendStatus(404);
  res.json(e);
});

router.put('/:id', async (req, res) => {
  const { score } = req.body;
  if (typeof score !== 'number') return res.status(400).json({ error: 'numeric score required' });
  const e = await Leaderboard.findByIdAndUpdate(req.params.id, { score }, { new: true }).lean();
  if (!e) return res.sendStatus(404);
  res.json(e);
});

router.delete('/:id', async (req, res) => {
  await Leaderboard.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

export default router;
