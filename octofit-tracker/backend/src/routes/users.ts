import { Router } from 'express';
import User from '../models/user.js';

const router = Router();

router.get('/', async (_req, res) => {
  const list = await User.find().lean();
  res.json(list);
});

router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name and email required' });
    const u = await User.create({ name, email });
    res.status(201).json(u);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const u = await User.findById(req.params.id).lean();
  if (!u) return res.sendStatus(404);
  res.json(u);
});

router.put('/:id', async (req, res) => {
  const { name, email } = req.body;
  const u = await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true }).lean();
  if (!u) return res.sendStatus(404);
  res.json(u);
});

router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

export default router;
