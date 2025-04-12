const mongoose = require('mongoose');

const TraditionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  tribe: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Language', 'Clothing', 'Ritual', 'Music', 'Dance', 'Food', 'Other'],
    default: 'Other'
  },
  description: {
    type: String,
    required: true
  },
  mediaUrl: {
    type: String // Will store the Cloudinary image/video URL
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Tradition', TraditionSchema);
