import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container-3d">
      {/* 3D Animated Background */}
      <div className="home-3d-bg">
        {/* 3D Floating Music Elements */}
        <div className="floating-music-elements">
          <div className="music-element-3d element-1">🎵</div>
          <div className="music-element-3d element-2">♪</div>
          <div className="music-element-3d element-3">♫</div>
          <div className="music-element-3d element-4">🎶</div>
          <div className="music-element-3d element-5">🎼</div>
          <div className="music-element-3d element-6">🎤</div>
          <div className="music-element-3d element-7">🎧</div>
          <div className="music-element-3d element-8">🔊</div>
        </div>

        {/* 3D Geometric Shapes */}
        <div className="floating-3d-geometry">
          <div className="geometry-3d cube-home-1"></div>
          <div className="geometry-3d sphere-home-1"></div>
          <div className="geometry-3d pyramid-home-1"></div>
          <div className="geometry-3d cylinder-home-1"></div>
          <div className="geometry-3d octagon-home-1"></div>
        </div>

        {/* 3D Wave Rings */}
        <div className="wave-rings-3d">
          <div className="wave-ring ring-1"></div>
          <div className="wave-ring ring-2"></div>
          <div className="wave-ring ring-3"></div>
          <div className="wave-ring ring-4"></div>
        </div>

        {/* 3D Particle System */}
        <div className="particle-system-3d">
          <div className="particle-home particle-1"></div>
          <div className="particle-home particle-2"></div>
          <div className="particle-home particle-3"></div>
          <div className="particle-home particle-4"></div>
          <div className="particle-home particle-5"></div>
          <div className="particle-home particle-6"></div>
          <div className="particle-home particle-7"></div>
          <div className="particle-home particle-8"></div>
          <div className="particle-home particle-9"></div>
          <div className="particle-home particle-10"></div>
        </div>
      </div>

      {/* 3D Hero Section */}
      <div className="hero-section-3d">
        <div className="hero-content-3d">
          <div className="hero-title-container-3d">
            <h1 className="hero-title-3d">
              <span className="title-icon-3d">🎶</span>
              <span className="title-text-3d">Welcome to TUNE WAVE</span>
              <span className="title-icon-3d">🎶</span>
            </h1>
            <div className="title-glow-3d"></div>
          </div>
          <p className="hero-subtitle-3d">Your Personal Music Streaming & Preview Platform</p>
          <Link to="/browse" className="browse-btn-3d">
            <div className="btn-3d-container">
              <div className="btn-face btn-front">
                <span className="btn-icon">🚀</span>
                Start Listening
              </div>
              <div className="btn-face btn-back"></div>
              <div className="btn-face btn-right"></div>
              <div className="btn-face btn-left"></div>
              <div className="btn-face btn-top"></div>
              <div className="btn-face btn-bottom"></div>
            </div>
          </Link>
        </div>
      </div>

      {/* 3D Features Section */}
      <div className="features-3d">
        <div className="features-container-3d">
          <div className="feature-card-3d card-1">
            <div className="card-3d-inner">
              <div className="card-3d-front">
                <div className="feature-icon-3d">🎵</div>
                <h3 className="feature-title-3d">Stream Previews</h3>
                <p className="feature-desc-3d">Listen to top tracks with our integrated music player.</p>
                <div className="card-glow-3d"></div>
              </div>
              <div className="card-3d-back">
                <div className="card-back-content">
                  <div className="back-icon">🎵</div>
                  <h4>Premium Quality</h4>
                  <p>High-quality audio streaming with crystal clear sound</p>
                </div>
              </div>
            </div>
          </div>

          <div className="feature-card-3d card-2">
            <div className="card-3d-inner">
              <div className="card-3d-front">
                <div className="feature-icon-3d">🔍</div>
                <h3 className="feature-title-3d">Explore Songs</h3>
                <p className="feature-desc-3d">Discover new and trending music from public APIs.</p>
                <div className="card-glow-3d"></div>
              </div>
              <div className="card-3d-back">
                <div className="card-back-content">
                  <div className="back-icon">🔍</div>
                  <h4>Smart Discovery</h4>
                  <p>AI-powered recommendations based on your taste</p>
                </div>
              </div>
            </div>
          </div>

          <div className="feature-card-3d card-3">
            <div className="card-3d-inner">
              <div className="card-3d-front">
                <div className="feature-icon-3d">📥</div>
                <h3 className="feature-title-3d">Download Previews</h3>
                <p className="feature-desc-3d">Instantly download preview clips to your device.</p>
                <div className="card-glow-3d"></div>
              </div>
              <div className="card-3d-back">
                <div className="card-back-content">
                  <div className="back-icon">📥</div>
                  <h4>Offline Access</h4>
                  <p>Download and enjoy your favorite tracks offline</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D About Section */}
      <div className="about-section-3d">
        <div className="about-container-3d">
          <div className="about-content-3d">
            <h2 className="about-title-3d">About TUNE WAVE</h2>
            <div className="about-text-3d">
              <p>
                TUNE WAVE is a React-powered music streaming space built using
                public music APIs like iTunes and Jamendo. Stream tracks, download
                previews, and discover music all in one place.
              </p>
            </div>
            <div className="about-stats-3d">
              <div className="stat-item-3d">
                <div className="stat-number-3d">10K+</div>
                <div className="stat-label-3d">Songs</div>
              </div>
              <div className="stat-item-3d">
                <div className="stat-number-3d">500+</div>
                <div className="stat-label-3d">Artists</div>
              </div>
              <div className="stat-item-3d">
                <div className="stat-number-3d">50+</div>
                <div className="stat-label-3d">Genres</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Footer */}
      <footer className="footer-3d">
        <div className="footer-content-3d">
          <div className="footer-text-3d">
            Made with <span className="heart-3d">❤️</span> by Runtime Rebels
          </div>
          <div className="footer-glow-3d"></div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
