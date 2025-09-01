import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { assets } from '../assets';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src={assets.logo} alt="Movie Review Logo" />
          </Link>
        </div>
        <nav className="nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {user && <li><Link to="/watchlist">Watchlist</Link></li>}
            {user && <li><Link to="/profile">Profile</Link></li>}
          </ul>
        </nav>
        <div className="auth">
          {user ? (
            <div className="user-info">
              <span>Welcome, {user.name}</span>
              <button onClick={logout}>Logout</button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
