import mongoose from 'mongoose';

const foundItemSchema = new mongoose.Schema({
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
  dateFound: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'claimed'],
    default: 'available',
  },
  finder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  images: [{
    type: String,
  }],
}, { timestamps: true });

export default mongoose.model('FoundItem', foundItemSchema);