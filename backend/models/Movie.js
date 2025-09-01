const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  poster_path: {
    type: String,
  },
  backdrop_path: {
    type: String,
  },
  genres: [{
    id: Number,
    name: String,
  }],
  director: {
    name: String,
    profile_path: String,
  },
  casts: [{
    name: String,
    profile_path: String,
  }],
  release_date: {
    type: Date,
  },
  original_language: {
    type: String,
  },
  tagline: {
    type: String,
  },
  vote_average: {
    type: Number,
    default: 0,
  },
  vote_count: {
    type: Number,
    default: 0,
  },
  runtime: {
    type: Number,
  },
  trailers: [{
    image: String,
    videoUrl: String,
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Movie', movieSchema);
