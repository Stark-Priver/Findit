import mongoose from 'mongoose';

const lostItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  dateLost: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'found', 'claimed'],
    default: 'pending',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('LostItem', lostItemSchema);