import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <h1>Welcome to CommunityHub</h1>
          <p>Connect, engage, and grow with your community</p>
          <div className="hero-buttons">
            <Link to="/events" className="btn btn-primary btn-lg">
              Browse Events
            </Link>
            <Link to="/register" className="btn btn-secondary btn-lg">
              Join Community
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="text-center mb-4">What We Offer</h2>
          <div className="grid">
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Event Management</h3>
              <p>Create, manage, and join community events with ease</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Community Building</h3>
              <p>Connect with like-minded people in your area</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📢</div>
              <h3>Announcements</h3>
              <p>Stay updated with important community news</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Easy Registration</h3>
              <p>Simple sign-up process for all events</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container text-center">
          <h2>Ready to Get Started?</h2>
          <p>Join our community today and start participating in amazing events</p>
          <Link to="/register" className="btn btn-primary btn-lg">
            Create Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
