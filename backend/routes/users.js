const express = require('express');
const User = require('../models/User');
const Watchlist = require('../models/Watchlist');
const Review = require('../models/Review');
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Update user profile
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.params.id !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Get user's watchlist
router.get('/:id/watchlist', auth, async (req, res) => {
  try {
    if (req.params.id !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    const watchlist = await Watchlist.find({ user: req.params.id }).populate('movie');
    res.json(watchlist);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Add movie to watchlist
router.post('/:id/watchlist', auth, async (req, res) => {
  try {
    if (req.params.id !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    const { movieId } = req.body;
    const watchlistItem = new Watchlist({
      user: req.params.id,
      movie: movieId,
    });
    await watchlistItem.save();
    res.status(201).json(watchlistItem);
  } catch (e) {
    if (e.code === 11000) {
      res.status(400).json({ error: 'Movie already in watchlist' });
    } else {
      res.status(400).json({ error: e.message });
    }
  }
});

// Remove movie from watchlist
router.delete('/:id/watchlist/:movieId', auth, async (req, res) => {
  try {
    if (req.params.id !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    const watchlistItem = await Watchlist.findOneAndDelete({
      user: req.params.id,
      movie: req.params.movieId,
    });
    if (!watchlistItem) {
      return res.status(404).json({ error: 'Movie not in watchlist' });
    }
    res.json({ message: 'Removed from watchlist' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Follow a user
router.post('/:id/follow', auth, async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ error: 'Cannot follow yourself' });
    }
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToFollow) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (currentUser.following.includes(req.params.id)) {
      return res.status(400).json({ error: 'Already following this user' });
    }

    currentUser.following.push(req.params.id);
    userToFollow.followers.push(req.user._id);

    await currentUser.save();
    await userToFollow.save();

    // Create notification
    const notification = new Notification({
      user: req.params.id,
      type: 'follow',
      message: `${currentUser.name} started following you`,
      relatedUser: req.user._id,
    });
    await notification.save();

    res.json({ message: 'User followed successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Unfollow a user
router.delete('/:id/follow', auth, async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToUnfollow) {
      return res.status(404).json({ error: 'User not found' });
    }

    currentUser.following = currentUser.following.filter(id => id.toString() !== req.params.id);
    userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== req.user._id.toString());

    await currentUser.save();
    await userToUnfollow.save();

    res.json({ message: 'User unfollowed successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get followed users' reviews
router.get('/:id/followed-reviews', auth, async (req, res) => {
  try {
    if (req.params.id !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    const user = await User.findById(req.params.id).populate('following');
    const followedUserIds = user.following.map(f => f._id);

    const reviews = await Review.find({ user: { $in: followedUserIds } })
      .populate('user', 'name')
      .populate('movie', 'title poster_path')
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(reviews);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
