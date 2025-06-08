import express from 'express';
import { auth } from '../middleware/auth.js';
import User from '../models/User.js';
import LostItem from '../models/LostItem.js';
import FoundItem from '../models/FoundItem.js';
import ClaimRequest from '../models/ClaimRequest.js';

const router = express.Router();

router.get('/dashboard', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    const lostItems = await LostItem.find({ user: req.user.userId });
    const foundItems = await FoundItem.find({ finder: req.user.userId });
    const claimsSubmitted = await ClaimRequest.find({ claimant: req.user.userId });
    const claimsApproved = await ClaimRequest.find({ 
      claimant: req.user.userId, 
      status: 'approved' 
    });

    // Get recent claims with item details
    const recentClaims = await ClaimRequest.find({ claimant: req.user.userId })
      .populate('item', 'title')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      user,
      stats: {
        lostItems: lostItems.length,
        foundItems: foundItems.length,
        claimsSubmitted: claimsSubmitted.length,
        claimsApproved: claimsApproved.length,
      },
      recentLostItems: lostItems.slice(0, 5),
      recentFoundItems: foundItems.slice(0, 5),
      recentClaims: recentClaims,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;