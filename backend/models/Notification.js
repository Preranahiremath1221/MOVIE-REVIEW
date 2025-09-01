const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['review', 'follow', 'watchlist'],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  relatedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  relatedMovie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
  },
  isRead: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Notification', notificationSchema);
