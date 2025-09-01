import React from 'react';
import { assets } from '../assets';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <img src={assets.logo} alt="Movie Review Logo" className="footer-logo" />
            <p>Your ultimate destination for movie reviews and recommendations.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/movies">Movies</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer"><img src={assets.googlePlay} alt="Google Play" /></a>
              <a href="https://www.apple.com/app-store" target="_blank" rel="noopener noreferrer"><img src={assets.appStore} alt="App Store" /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Movie Review Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
