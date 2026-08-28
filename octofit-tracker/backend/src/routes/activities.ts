import { Router } from 'express';
import Activity from '../models/activity.js';

const router = Router();

router.get('/', async (_req, res) => {
  const list = await Activity.find().populate('user').lean();
  res.json(list);
});

router.post('/', async (req, res) => {
  try {
    const { user, type, durationMinutes, date, calories } = req.body;
    if (!user || !type) return res.status(400).json({ error: 'user and type required' });
    const a = await Activity.create({ user, type, durationMinutes: durationMinutes || 0, date: date || new Date(), calories });
    res.status(201).json(a);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const a = await Activity.findById(req.params.id).populate('user').lean();
  if (!a) return res.sendStatus(404);
  res.json(a);
});

router.put('/:id', async (req, res) => {
  const { type, durationMinutes, date, calories } = req.body;
  const a = await Activity.findByIdAndUpdate(req.params.id, { type, durationMinutes, date, calories }, { new: true }).lean();
  if (!a) return res.sendStatus(404);
  res.json(a);
});

router.delete('/:id', async (req, res) => {
  await Activity.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

export default router;
