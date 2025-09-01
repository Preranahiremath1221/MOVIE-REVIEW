import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Error from './Error';

function Notifications() {
  const { user, notifications, fetchNotifications } = useContext(AuthContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && notifications.length === 0) {
      fetchNotifications();
    }
  }, [user, notifications.length, fetchNotifications]);

  const markAsRead = async (notificationId) => {
    try {
      await axios.put(`/api/notifications/${notificationId}/read`);
      fetchNotifications();
    } catch (err) {
      setError('Failed to mark notification as read');
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await axios.delete(`/api/notifications/${notificationId}`);
      fetchNotifications();
    } catch (err) {
      setError('Failed to delete notification');
    }
  };

  if (!user) return <Error message="Please login to view notifications" />;

  return (
    <div className="notifications">
      <h1>Notifications</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <p>No notifications yet.</p>
        ) : (
          notifications.map(notification => (
            <div key={notification._id} className={`notification-card ${!notification.isRead ? 'unread' : ''}`}>
              <div className="notification-content">
                <p>{notification.message}</p>
                <span className="notification-date">
                  {new Date(notification.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="notification-actions">
                {!notification.isRead && (
                  <button onClick={() => markAsRead(notification._id)} className="btn-secondary">
                    Mark as Read
                  </button>
                )}
                <button onClick={() => deleteNotification(notification._id)} className="btn-danger">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notifications;
