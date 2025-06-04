import express from 'express';
import { auth } from '../middleware/auth.js';
import User from '../models/User.js';
import LostItem from '../models/LostItem.js';
import FoundItem from '../models/FoundItem.js';

const router = express.Router();

router.get('/dashboard', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    const lostItems = await LostItem.find({ user: req.user.userId });
    const foundItems = await FoundItem.find({ finder: req.user.userId });

    res.json({
      user,
      stats: {
        lostItems: lostItems.length,
        foundItems: foundItems.length,
      },
      recentLostItems: lostItems.slice(0, 5),
      recentFoundItems: foundItems.slice(0, 5),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;