
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewForm from './ReviewForm';
import Loading from './Loading';
import Error from './Error';
import { dummyShowsData, dummyTrailers, dummyReviews } from '../assets';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTrailer, setSelectedTrailer] = useState(null);

  const getYouTubeVideoId = (url) => {
    // eslint-disable-next-line no-useless-escape
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  // Removed unused isYouTubeUrl function to fix eslint warning

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieRes = await axios.get(`/api/movies/${id}`);
        let movieData = movieRes.data;



        setMovie(movieData);

        // Set the first trailer as selected by default
        if (movieData.trailers && movieData.trailers.length > 0) {
          const firstTrailer = movieData.trailers[0];
          const firstTrailerUrl = typeof firstTrailer === 'string' ? firstTrailer : firstTrailer.videoUrl;
          setSelectedTrailer(firstTrailerUrl);
        }

        const reviewsRes = await axios.get(`/api/reviews/movie/${id}`);
        setReviews(reviewsRes.data);
        if (reviewsRes.data.length === 0) {
          setReviews(dummyReviews);
        }
      } catch (err) {
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="movie-details">
      {movie && (
        <>
          {/* Movie Header */}
          <div className="movie-header">
            <div className="movie-poster">
              {movie.posterUrl ? (
                <img src={movie.posterUrl} alt={movie.title} />
              ) : (
                <div className="no-image">No Image Available</div>
              )}
            </div>
            <div className="movie-info">
              <h1>{movie.title || 'N/A'}</h1>
              {movie.tagline && <p className="tagline">"{movie.tagline}"</p>}
              <div className="movie-meta">
                <span>Release Year: {movie.releaseYear || 'N/A'}</span>
                <span>Runtime: {movie.runtime ? `${movie.runtime} min` : 'N/A'}</span>
                <span>Rating: {movie.averageRating ? `${movie.averageRating}/10` : 'N/A'} ({movie.voteCount ? movie.voteCount.toLocaleString() : '0'} votes)</span>
              </div>
              <div className="genres">
                {movie.genre && movie.genre.length > 0 ? (
                  movie.genre.map((genre, index) => (
                    <span key={index} className="genre-tag">{genre}</span>
                  ))
                ) : (
                  <span className="genre-tag">N/A</span>
                )}
              </div>
              <p className="overview">{movie.synopsis || movie.overview || 'No description available.'}</p>
            </div>
          </div>



          {/* Director Section */}
          {movie.director && (
            <section className="director-section">
              <h2>Director</h2>
              <div className="director-card">
                <p>{typeof movie.director === 'object' && movie.director.name ? movie.director.name : movie.director}</p>
              </div>
            </section>
          )}

          {/* Cast Section */}
          {movie.casts && movie.casts.length > 0 && (
            <section className="cast-section">
              <h2>Cast</h2>
              <div className="cast-grid">
                {movie.casts.filter(actor => typeof actor.profile_path === 'string' && actor.profile_path).map((actor, index) => (
                  <div key={index} className="cast-card">
                    <img
                      src={actor.profile_path && !actor.profile_path.startsWith('http') ? `https://image.tmdb.org/t/p/w300${actor.profile_path}` : actor.profile_path}
                      alt={typeof actor.name === 'string' ? actor.name : 'Actor'}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div
                      className="cast-image-placeholder"
                      style={{ display: 'none' }}
                    >
                      <span>No Image</span>
                    </div>
                    <p>{typeof actor === 'object' && actor.name ? actor.name : String(actor)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Trailers Section */}
          <section className="trailers-section">
            <h2>Trailers</h2>
            <div className="trailers-grid">
              {movie.trailers && movie.trailers.length > 0 ? (
                movie.trailers.map((trailer, index) => {
                  // Handle both string URLs and object format
                  const trailerUrl = typeof trailer === 'string' ? trailer : trailer.videoUrl;

                  return (
                    <div key={index} className="trailer-card">
                      <div className="trailer-placeholder">
                        <span>🎬</span>
                        <p>Trailer {index + 1}</p>
                      </div>
                      {trailerUrl ? (
                        <button onClick={() => setSelectedTrailer(trailerUrl)} className="btn-primary">
                          Watch Trailer
                        </button>
                      ) : (
                        <button className="btn-secondary" disabled>
                          Trailer Unavailable
                        </button>
                      )}
                    </div>
                  );
                })
              ) : (
                <p>No trailers available.</p>
              )}
            </div>
            {selectedTrailer && (
              <div className="trailer-player">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(selectedTrailer)}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <button onClick={() => setSelectedTrailer(null)}>Close</button>
              </div>
            )}
          </section>

          {/* Reviews Section */}
          <section className="reviews-section">
            <h2>Reviews</h2>
            <ReviewForm movieId={movie._id} movieTitle={movie.title} onReviewAdded={(newReview) => setReviews([newReview, ...reviews])} />
            <div className="reviews-list">
              {reviews.map(review => (
                <div key={review._id} className="review-card">
                  <div className="review-header">
                    <span className="review-user">{review.user.name}</span>
                    <span className="review-rating">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                    <span className="review-date">{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
