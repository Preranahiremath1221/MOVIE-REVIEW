

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Loading from './Loading';
import Error from './Error';

function UserProfile() {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [followedReviews, setFollowedReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    console.log('UserProfile: Fetching data for user:', user);
    console.log('User ID:', user._id);

    const fetchUserData = async () => {
      try {
        console.log('Making API calls...');

        const [reviewsRes, watchlistRes, followedReviewsRes] = await Promise.allSettled([
          axios.get(`/api/reviews/user/${user._id}`).catch(err => {
            console.error('Reviews API error:', err.response?.data || err.message);
            throw err;
          }),
          axios.get(`/api/users/${user._id}/watchlist`).catch(err => {
            console.error('Watchlist API error:', err.response?.data || err.message);
            throw err;
          }),
          axios.get(`/api/users/${user._id}/followed-reviews`).catch(err => {
            console.error('Followed reviews API error:', err.response?.data || err.message);
            throw err;
          })
        ]);

        console.log('Reviews response:', reviewsRes);
        console.log('Watchlist response:', watchlistRes);
        console.log('Followed reviews response:', followedReviewsRes);

        if (reviewsRes.status === 'fulfilled') {
          console.log('Setting reviews:', reviewsRes.value.data);
          setReviews(reviewsRes.value.data);
        } else {
          console.error('Failed to load reviews:', reviewsRes.reason);
        }

        if (watchlistRes.status === 'fulfilled') {
          console.log('Setting watchlist:', watchlistRes.value.data);
          setWatchlist(watchlistRes.value.data);
        } else {
          console.error('Failed to load watchlist:', watchlistRes.reason);
        }

        if (followedReviewsRes.status === 'fulfilled') {
          console.log('Setting followed reviews:', followedReviewsRes.value.data);
          setFollowedReviews(followedReviewsRes.value.data);
        } else {
          console.error('Failed to load followed reviews:', followedReviewsRes.reason);
        }

        // Set error only if all requests failed
        if (reviewsRes.status === 'rejected' && watchlistRes.status === 'rejected' && followedReviewsRes.status === 'rejected') {
          setError('Failed to load user data');
        }
      } catch (err) {
        console.error('General error in fetchUserData:', err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!user) return <p>Please login to view your profile.</p>;

  return (
    <div className="user-profile">
      <h2>{user.name}'s Profile</h2>
      <p>Email: {user.email}</p>

      <section className="review-history">
        <h3>My Review History</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul>
            {reviews.map(review => (
              <li key={review._id}>
                <strong>{review.movie.title}</strong>: {review.comment} ({review.rating} stars)
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="followed-reviews">
        <h3>Reviews from Followed Users</h3>
        {followedReviews.length === 0 ? (
          <p>No reviews from followed users yet.</p>
        ) : (
          <ul>
            {followedReviews.map(review => (
              <li key={review._id}>
                <strong>{review.user.name}</strong> reviewed <strong>{review.movie.title}</strong>: {review.comment} ({review.rating} stars)
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="watchlist">
        <h3>Watchlist</h3>
        {watchlist.length === 0 ? (
          <p>Your watchlist is empty.</p>
        ) : (
          <ul>
            {watchlist.map(item => (
              <li key={item._id}>{item.movie ? item.movie.title : 'Unknown Movie'}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default UserProfile;
