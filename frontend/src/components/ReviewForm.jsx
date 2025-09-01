import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function ReviewForm({ movieId, movieTitle, onReviewAdded }) {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('Please login to submit a review');
      return;
    }
    if (!comment.trim()) {
      setError('Please enter a comment');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`/api/reviews/movie/${movieId}`, {
        rating,
        comment,
      });

      // Format the response to match the expected format
      const newReview = {
        _id: response.data._id,
        user: {
          name: user.name,
        },
        movie: {
          title: movieTitle || 'Unknown Movie',
        },
        rating,
        comment,
        createdAt: response.data.createdAt,
      };

      onReviewAdded(newReview);
      setRating(5);
      setComment('');
    } catch (err) {
      console.error('Review submission error:', err);
      setError(err.response?.data?.error || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="review-form">
        <p>Please <a href="/login">login</a> to submit a review.</p>
      </div>
    );
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>Write a Review</h3>
      {error && <p className="error">{error}</p>}
      <div className="form-group">
        <label>Rating:</label>
        <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this movie..."
          rows="4"
          required
        />
      </div>
      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}

export default ReviewForm;
