import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Loading from './Loading';
import Error from './Error';

function AdminDashboard() {
  const { isAdmin } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAdmin()) {
      fetchData();
    } else {
      setError('Access denied. Admin privileges required.');
      setLoading(false);
    }
  }, [isAdmin]);

  const fetchData = async () => {
    try {
      const [usersRes, moviesRes, reviewsRes] = await Promise.all([
        axios.get('/api/admin/users'),
        axios.get('/api/admin/movies'),
        axios.get('/api/admin/reviews')
      ]);
      setUsers(usersRes.data);
      setMovies(moviesRes.data);
      setReviews(reviewsRes.data);
    } catch (err) {
      setError('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/admin/users/${userId}`);
        setUsers(users.filter(u => u._id !== userId));
      } catch (err) {
        alert('Failed to delete user');
      }
    }
  };

  const deleteMovie = async (movieId) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await axios.delete(`/api/admin/movies/${movieId}`);
        setMovies(movies.filter(m => m._id !== movieId));
      } catch (err) {
        alert('Failed to delete movie');
      }
    }
  };

  const deleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await axios.delete(`/api/admin/reviews/${reviewId}`);
        setReviews(reviews.filter(r => r._id !== reviewId));
      } catch (err) {
        alert('Failed to delete review');
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!isAdmin()) return <Error message="Access denied" />;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="admin-tabs">
        <button
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          Users ({users.length})
        </button>
        <button
          className={activeTab === 'movies' ? 'active' : ''}
          onClick={() => setActiveTab('movies')}
        >
          Movies ({movies.length})
        </button>
        <button
          className={activeTab === 'reviews' ? 'active' : ''}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews ({reviews.length})
        </button>
      </div>

      {activeTab === 'users' && (
        <section className="admin-section">
          <h2>Users Management</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.status}</td>
                  <td>
                    <button onClick={() => deleteUser(user._id)} className="btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {activeTab === 'movies' && (
        <section className="admin-section">
          <h2>Movies Management</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Release Date</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{new Date(movie.release_date).toLocaleDateString()}</td>
                  <td>{movie.vote_average}/10</td>
                  <td>
                    <button onClick={() => deleteMovie(movie._id)} className="btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {activeTab === 'reviews' && (
        <section className="admin-section">
          <h2>Reviews Management</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Movie</th>
                <th>User</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map(review => (
                <tr key={review._id}>
                  <td>{review.movie.title}</td>
                  <td>{review.user.name}</td>
                  <td>{review.rating}/5</td>
                  <td>{review.comment.substring(0, 50)}...</td>
                  <td>
                    <button onClick={() => deleteReview(review._id)} className="btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}

export default AdminDashboard;
