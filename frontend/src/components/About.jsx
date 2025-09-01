import React from 'react';

function About() {
  return (
    <div className="about">
      <div className="about-container">
        <h1>About Movie Review Platform</h1>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Welcome to Movie Review Platform, your ultimate destination for discovering,
            reviewing, and sharing your favorite movies. We believe that movies are more
            than just entertainment – they're a way to connect, learn, and explore new perspectives.
          </p>
          <img
            src="https://images.unsplash.com/photo-1489599735734-79b4d4c4b5b8?w=800&h=400&fit=crop"
            alt="Movie theater with people watching"
            style={{ width: '100%', borderRadius: '8px', marginTop: '20px' }}
          />
        </section>

        <section className="about-section">
          <h2>What We Offer</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🎬 Movie Discovery</h3>
              <p>Browse through our extensive collection of movies across all genres</p>
              <img
                src="https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=250&fit=crop"
                alt="Movie collection"
                style={{ width: '100%', borderRadius: '8px', marginTop: '10px' }}
              />
            </div>
            <div className="feature-card">
              <h3>⭐ Reviews & Ratings</h3>
              <p>Read and write reviews to help others discover great movies</p>
              <img
                src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=250&fit=crop"
                alt="Star ratings"
                style={{ width: '100%', borderRadius: '8px', marginTop: '10px' }}
              />
            </div>
            <div className="feature-card">
              <h3>📋 Personal Watchlist</h3>
              <p>Create and manage your personal movie watchlist</p>
              <img
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop"
                alt="Notebook with movie list"
                style={{ width: '100%', borderRadius: '8px', marginTop: '10px' }}
              />
            </div>
            <div className="feature-card">
              <h3>👤 User Profiles</h3>
              <p>Build your movie profile and connect with fellow movie enthusiasts</p>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"
                alt="People connecting"
                style={{ width: '100%', borderRadius: '8px', marginTop: '10px' }}
              />
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded with a passion for cinema, Movie Review Platform was created to bridge
            the gap between movie lovers and the films they love. Our platform serves as a
            community hub where users can explore, discuss, and celebrate the art of filmmaking.
          </p>
          <img
            src="https://images.unsplash.com/photo-1489599735734-79b4d4c4b5b8?w=800&h=400&fit=crop"
            alt="Cinema history"
            style={{ width: '100%', borderRadius: '8px', marginTop: '20px' }}
          />
        </section>

        <section className="about-section">
          <h2>Contact Us</h2>
          <p>
            Have questions or feedback? We'd love to hear from you!
            Reach out to us at contact@moviereviewplatform.com
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
