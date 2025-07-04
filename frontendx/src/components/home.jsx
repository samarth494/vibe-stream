import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>🎶 Welcome to TUNE WAVE</h1>
        <p>Your Personal Music Streaming & Preview Platform</p>
        <Link to="/browse" className="browse-btn">Start Listening</Link>
      </div>

      <div className="features">
        <div className="feature-card">
          🎵 <h3>Stream Previews</h3>
          <p>Listen to top tracks with our integrated music player.</p>
        </div>
        <div className="feature-card">
          🔍 <h3>Explore Songs</h3>
          <p>Discover new and trending music from public APIs.</p>
        </div>
        <div className="feature-card">
          📥 <h3>Download Previews</h3>
          <p>Instantly download preview clips to your device.</p>
        </div>
      </div>

      <div className="about-section">
        <h2>About TUNE WAVE</h2>
        <p>
          TUNE WAVE is a React-powered music streaming space built using
          public music APIs like iTunes and Jamendo. Stream tracks, download
          previews, and discover music all in one place.
        </p>
      </div>

      <footer className="footer">
        Made with ❤️ by Runtime Rebels 
      </footer>
    </div>
  );
}

export default Home;
