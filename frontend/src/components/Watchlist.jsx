import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import Error from './Error';

function Watchlist() {
  const { user } = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchWatchlist = async () => {
      try {
        const res = await axios.get(`/api/users/${user._id}/watchlist`);
        setWatchlist(res.data);
      } catch (err) {
        setError('Failed to load watchlist');
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [user]);

  const removeFromWatchlist = async (movieId) => {
    try {
      await axios.delete(`/api/users/${user._id}/watchlist/${movieId}`);
      setWatchlist(watchlist.filter(movie => movie._id !== movieId));
    } catch (err) {
      setError('Failed to remove from watchlist');
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!user) return <p>Please login to view your watchlist.</p>;

  return (
    <div className="watchlist">
      <h2>My Watchlist</h2>
      {watchlist.length === 0 ? (
        <p>Your watchlist is empty. <Link to="/movies">Browse movies</Link> to add some!</p>
      ) : (
        <div className="movies-grid">
          {watchlist.map(movie => (
            <div key={movie._id} className="movie-card">
              <img src={movie.poster_path} alt={movie.title} />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>Rating: {movie.vote_average}/10</p>
                <p>Year: {new Date(movie.release_date).getFullYear()}</p>
                <div className="card-actions">
                  <Link to={`/movies/${movie._id}`} className="btn-small">View Details</Link>
                  <button onClick={() => removeFromWatchlist(movie._id)} className="btn-secondary">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;
