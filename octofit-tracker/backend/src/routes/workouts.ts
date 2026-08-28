import { Router } from 'express';
import Workout from '../models/workout.js';

const router = Router();

router.get('/', async (_req, res) => {
  const list = await Workout.find().populate('user').lean();
  res.json(list);
});

router.post('/', async (req, res) => {
  try {
    const { user, name, exercises } = req.body;
    if (!user || !name) return res.status(400).json({ error: 'user and name required' });
    const w = await Workout.create({ user, name, exercises: exercises || [] });
    res.status(201).json(w);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const w = await Workout.findById(req.params.id).populate('user').lean();
  if (!w) return res.sendStatus(404);
  res.json(w);
});

router.put('/:id', async (req, res) => {
  const { name, exercises } = req.body;
  const w = await Workout.findByIdAndUpdate(req.params.id, { name, exercises }, { new: true }).lean();
  if (!w) return res.sendStatus(404);
  res.json(w);
});

router.delete('/:id', async (req, res) => {
  await Workout.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

export default router;
