const express = require('express');
const { body, validationResult } = require('express-validator');
const Review = require('../models/Review');
const Movie = require('../models/Movie');
const Watchlist = require('../models/Watchlist');
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');

const router = express.Router();

// Get reviews for a movie
router.get('/movie/:movieId', async (req, res) => {
  try {
    const reviews = await Review.find({ movie: req.params.movieId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get reviews by user
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.params.userId })
      .populate('movie', 'title')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Create a review
router.post('/movie/:movieId', auth, [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').notEmpty().withMessage('Comment is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { rating, comment } = req.body;
    const review = new Review({
      user: req.user._id,
      movie: req.params.movieId,
      rating,
      comment,
    });
    await review.save();

    // Update movie average rating
    const reviews = await Review.find({ movie: req.params.movieId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Movie.findByIdAndUpdate(req.params.movieId, {
      vote_average: avgRating,
      vote_count: reviews.length,
    });

    // Notify users who have this movie in watchlist
    const watchlistUsers = await Watchlist.find({ movie: req.params.movieId }).populate('user');
    const movie = await Movie.findById(req.params.movieId);

    for (const watchlistItem of watchlistUsers) {
      if (watchlistItem.user._id.toString() !== req.user._id.toString()) {
        const notification = new Notification({
          user: watchlistItem.user._id,
          type: 'review',
          message: `New review for ${movie.title}`,
          relatedUser: req.user._id,
          relatedMovie: req.params.movieId,
        });
        await notification.save();

        // Emit socket event
        const io = req.app.get('io');
        io.to(watchlistItem.user._id.toString()).emit('notification', notification);
      }
    }

    res.status(201).json(review);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Update a review
router.put('/:id', auth, [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').notEmpty().withMessage('Comment is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const review = await Review.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Delete a review
router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json({ message: 'Review deleted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
