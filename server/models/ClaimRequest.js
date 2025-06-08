import mongoose from 'mongoose';

const claimRequestSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoundItem',
    required: true,
  },
  claimant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  verificationDetails: {
    purchaseDate: String,
    purchaseLocation: String,
    serialNumber: String,
    identifyingFeatures: {
      type: String,
      required: true,
    },
    additionalDetails: String,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
}, { timestamps: true });

export default mongoose.model('ClaimRequest', claimRequestSchema);