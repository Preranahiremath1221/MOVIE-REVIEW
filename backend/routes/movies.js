const express = require('express');
const Movie = require('../models/Movie');
const Review = require('../models/Review');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all movies with pagination and filters
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, genre, year, cast, ratingMin, ratingMax, sort = 'release_date', search } = req.query;
    const query = {};

    if (genre) {
      query['genres.name'] = { $regex: genre, $options: 'i' };
    }

    if (year) {
      query.release_date = {
        $gte: new Date(`${year}-01-01`),
        $lt: new Date(`${parseInt(year) + 1}-01-01`),
      };
    }

    if (cast) {
      query['casts.name'] = { $regex: cast, $options: 'i' };
    }

    if (ratingMin || ratingMax) {
      query.vote_average = {};
      if (ratingMin) query.vote_average.$gte = parseFloat(ratingMin);
      if (ratingMax) query.vote_average.$lte = parseFloat(ratingMax);
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }



    let movies = await Movie.find(query)
      .sort({ [sort]: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Movie.countDocuments(query);

    // Transform movies to match frontend expected fields
    movies = movies.map(movie => {
      return {
        _id: movie._id,
        title: movie.title,
        overview: movie.overview,
        posterUrl: movie.poster_path || '',
        backdrop_path: movie.backdrop_path || '',
        genre: movie.genres ? movie.genres.map(g => g.name) : [],
        cast: movie.casts ? movie.casts.map(c => c.name) : [],
        casts: movie.casts || [],
        director: typeof movie.director === 'string' ? { name: movie.director, profile_path: '' } : movie.director || null,
        releaseYear: movie.release_date ? movie.release_date.getFullYear() : '',
        original_language: movie.original_language,
        tagline: movie.tagline,
        averageRating: movie.vote_average,
        voteCount: movie.vote_count,
        runtime: movie.runtime,
        trailers: movie.trailers,
        createdAt: movie.createdAt,
        updatedAt: movie.updatedAt,
      };
    });

    res.json({
      movies,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    // Transform to match frontend expected fields
    const transformedMovie = {
      _id: movie._id,
      title: movie.title,
      overview: movie.overview,
      posterUrl: movie.poster_path || '',
      backdrop_path: movie.backdrop_path || '',
      genre: movie.genres ? movie.genres.map(g => g.name) : [],
      cast: movie.casts ? movie.casts.map(c => c.name) : [],
      casts: movie.casts || [],
      director: typeof movie.director === 'string' ? { name: movie.director, profile_path: '' } : movie.director || null,
      releaseYear: movie.release_date ? movie.release_date.getFullYear() : '',
      original_language: movie.original_language,
      tagline: movie.tagline,
      averageRating: movie.vote_average,
      voteCount: movie.vote_count,
      runtime: movie.runtime,
      trailers: movie.trailers,
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
    };
    res.json(transformedMovie);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Create movie (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Update movie (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Delete movie (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json({ message: 'Movie deleted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get movie recommendations for user
router.get('/recommendations/:userId', auth, async (req, res) => {
  try {
    if (req.params.userId !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Get user's reviews to find preferred genres
    const userReviews = await Review.find({ user: req.params.userId }).populate('movie');
    const genres = userReviews.flatMap(review => review.movie.genres.map(g => g.name));
    const uniqueGenres = [...new Set(genres)];

    let recommendations = [];
    if (uniqueGenres.length > 0) {
      // Recommend movies from user's preferred genres
      recommendations = await Movie.find({
        'genres.name': { $in: uniqueGenres },
        _id: { $nin: userReviews.map(r => r.movie._id) } // Exclude already reviewed movies
      })
      .sort({ vote_average: -1 })
      .limit(10);
    } else {
      // If no reviews, recommend top-rated movies
      recommendations = await Movie.find({})
        .sort({ vote_average: -1 })
        .limit(10);
    }

    res.json(recommendations);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
