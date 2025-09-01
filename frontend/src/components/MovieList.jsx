import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import Error from './Error';

function MovieList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [ratingMinFilter, setRatingMinFilter] = useState('');
  const [ratingMaxFilter, setRatingMaxFilter] = useState('');
  const [castFilter, setCastFilter] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (genreFilter) params.genre = genreFilter;
      if (yearFilter) params.year = yearFilter;
      if (ratingMinFilter) params.ratingMin = ratingMinFilter;
      if (ratingMaxFilter) params.ratingMax = ratingMaxFilter;
      if (castFilter) params.cast = castFilter;

      const res = await axios.get('/api/movies', { params });
      setMovies(res.data.movies);
    } catch (err) {
      setError('Failed to load movies');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, genreFilter, yearFilter, ratingMinFilter, ratingMaxFilter, castFilter]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="movie-list">
      <h2>Movie Listing</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by cast..."
          value={castFilter}
          onChange={e => setCastFilter(e.target.value)}
        />
        <select value={genreFilter} onChange={e => setGenreFilter(e.target.value)}>
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Horror">Horror</option>
          <option value="Romance">Romance</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Thriller">Thriller</option>
        </select>
        <select value={yearFilter} onChange={e => setYearFilter(e.target.value)}>
          <option value="">All Years</option>
          {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select value={ratingMinFilter} onChange={e => setRatingMinFilter(e.target.value)}>
          <option value="">Min Rating</option>
          {[1,2,3,4,5,6,7,8,9].map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        <select value={ratingMaxFilter} onChange={e => setRatingMaxFilter(e.target.value)}>
          <option value="">Max Rating</option>
          {[2,3,4,5,6,7,8,9,10].map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div className="movies-grid">
        {movies.filter(movie => movie.title !== 'Goodfellas').length > 0 ? (
          movies.filter(movie => movie.title !== 'Goodfellas').map(movie => (
            <div key={movie._id} className="movie-card">
              <div className="movie-poster">
                {movie.posterUrl ? (
                  <img src={movie.posterUrl} alt={movie.title} />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>
              <div className="movie-info">
                <h3>{movie.title || 'N/A'}</h3>
                <div className="movie-details">
                  <p><strong>Rating:</strong> {movie.averageRating ? `${movie.averageRating}/10` : 'N/A'}</p>
                  <p><strong>Year:</strong> {movie.releaseYear || 'N/A'}</p>
                  <p><strong>Director:</strong> {movie.director && typeof movie.director === 'object' && movie.director.name ? movie.director.name : movie.director || 'N/A'}</p>
                  <p><strong>Cast:</strong> {movie.cast && movie.cast.length > 0 ? movie.cast.slice(0, 2).map(c => typeof c === 'object' && c.name ? c.name : String(c)).join(', ') : 'N/A'}</p>
                  <p><strong>Genre:</strong> {movie.genre && movie.genre.length > 0 ? movie.genre.join(', ') : 'N/A'}</p>
                  <p><strong>Runtime:</strong> {movie.runtime ? `${movie.runtime} min` : 'N/A'}</p>
                  <p><strong>Votes:</strong> {movie.voteCount ? movie.voteCount.toLocaleString() : 'N/A'}</p>
                </div>
                {movie.tagline && <p className="movie-tagline">"{movie.tagline}"</p>}
                <Link to={`/movies/${movie._id}`} className="btn-small">View Details</Link>
              </div>
            </div>
          ))
        ) : (
          <p>No movies found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}

export default MovieList;
