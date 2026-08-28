import { Router } from 'express';
import Team from '../models/team.js';

const router = Router();

router.get('/', async (_req, res) => {
  const list = await Team.find().populate('members').lean();
  res.json(list);
});

router.post('/', async (req, res) => {
  try {
    const { name, members } = req.body;
    if (!name) return res.status(400).json({ error: 'name required' });
    const t = await Team.create({ name, members: members || [] });
    res.status(201).json(t);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const t = await Team.findById(req.params.id).populate('members').lean();
  if (!t) return res.sendStatus(404);
  res.json(t);
});

router.put('/:id', async (req, res) => {
  const { name, members } = req.body;
  const t = await Team.findByIdAndUpdate(req.params.id, { name, members }, { new: true }).lean();
  if (!t) return res.sendStatus(404);
  res.json(t);
});

router.delete('/:id', async (req, res) => {
  await Team.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

export default router;
