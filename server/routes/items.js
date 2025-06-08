import express from 'express';
import { auth } from '../middleware/auth.js';
import LostItem from '../models/LostItem.js';
import FoundItem from '../models/FoundItem.js';
import ClaimRequest from '../models/ClaimRequest.js';

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

router.get('/found/:id', async (req, res) => {
  try {
    const foundItem = await FoundItem.findById(req.params.id).populate('finder', 'name email');
    if (!foundItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(foundItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Claim Item Route
router.post('/claim/:id', auth, async (req, res) => {
  try {
    const { verificationDetails } = req.body;
    const itemId = req.params.id;

    // Check if item exists and is available
    const foundItem = await FoundItem.findById(itemId);
    if (!foundItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (foundItem.status !== 'available') {
      return res.status(400).json({ message: 'Item is no longer available for claiming' });
    }

    // Check if user already has a pending claim for this item
    const existingClaim = await ClaimRequest.findOne({
      item: itemId,
      claimant: req.user.userId,
      status: 'pending'
    });

    if (existingClaim) {
      return res.status(400).json({ message: 'You already have a pending claim for this item' });
    }

    // Create claim request
    const claimRequest = new ClaimRequest({
      item: itemId,
      claimant: req.user.userId,
      verificationDetails,
    });

    await claimRequest.save();
    res.status(201).json({ message: 'Claim submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;