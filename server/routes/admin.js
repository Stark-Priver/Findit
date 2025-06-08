import express from 'express';
import { auth } from '../middleware/auth.js';
import ClaimRequest from '../models/ClaimRequest.js';
import FoundItem from '../models/FoundItem.js';
import User from '../models/User.js';

const router = express.Router();

// Middleware to check if user is admin
const adminAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all claim requests
router.get('/claim-requests', auth, adminAuth, async (req, res) => {
  try {
    const claimRequests = await ClaimRequest.find()
      .populate('item')
      .populate('claimant', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(claimRequests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update claim request status
router.patch('/claim-requests/:id', auth, adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const claimId = req.params.id;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const claimRequest = await ClaimRequest.findById(claimId).populate('item');
    if (!claimRequest) {
      return res.status(404).json({ message: 'Claim request not found' });
    }

    claimRequest.status = status;
    await claimRequest.save();

    // If approved, update the found item status to claimed
    if (status === 'approved') {
      await FoundItem.findByIdAndUpdate(claimRequest.item._id, {
        status: 'claimed'
      });
    }

    res.json({ message: 'Claim request updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;