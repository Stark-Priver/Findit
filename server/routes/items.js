import express from 'express';
import { auth } from '../middleware/auth.js';
import LostItem from '../models/LostItem.js';
import FoundItem from '../models/FoundItem.js';

const router = express.Router();

// Lost Items Routes
router.post('/lost', auth, async (req, res) => {
  try {
    const lostItem = new LostItem({
      ...req.body,
      user: req.user.userId,
    });
    await lostItem.save();
    res.status(201).json(lostItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/lost', async (req, res) => {
  try {
    const lostItems = await LostItem.find().populate('user', 'name email');
    res.json(lostItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Found Items Routes
router.post('/found', auth, async (req, res) => {
  try {
    const foundItem = new FoundItem({
      ...req.body,
      finder: req.user.userId,
    });
    await foundItem.save();
    res.status(201).json(foundItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/found', async (req, res) => {
  try {
    const foundItems = await FoundItem.find().populate('finder', 'name email');
    res.json(foundItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;