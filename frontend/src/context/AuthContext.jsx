import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get('/api/notifications');
      setNotifications(res.data);
    } catch (e) {
      console.error('Failed to fetch notifications', e);
    }
  };

  const setupSocket = () => {
    const newSocket = io('http://localhost:5000');
    newSocket.on('notification', (notification) => {
      setNotifications(prev => [notification, ...prev]);
    });
    setSocket(newSocket);
  };

  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get('/api/auth/me');
      setUser(res.data);
      if (res.data) {
        fetchNotifications();
        setupSocket();
      }
    } catch (e) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [fetchUser]);

  const isAdmin = () => user?.role === 'admin';

  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
    fetchNotifications();
    setupSocket();
  };

  const register = async (name, email, password) => {
    const res = await axios.post('/api/auth/register', { name, email, password });
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
    fetchNotifications();
    setupSocket();
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setNotifications([]);
    socket?.disconnect();
    setSocket(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      loading,
      isAdmin,
      notifications,
      fetchNotifications
    }}>
      {children}
    </AuthContext.Provider>
  );
};
