import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from "./assets.png";
import "./App.css";
import NavBar from "./components/navBar";
import Browse from "./components/browse";
import Home from "./components/home";
import PlayListPage from "./components/PlayListPage";
import UploadPage from "./components/UploadPage";
import MusicPlayer from "./components/musicPlayer";

function App() {
  const [step, setStep] = useState(0);
  const [theme, setTheme] = useState("dark");
  const [currentSong, setCurrentSong] = useState(null); // 🎵 currently playing song

  // Toggle between dark and light themes
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Apply theme class to <body>
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Loading screens with timers
  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 4000);
    const timer2 = setTimeout(() => setStep(2), 7000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Step 0 → Loader
  if (step === 0) {
    return (
      <div className="loader-screen">
        <img src={logo} alt="Logo" className="logo" />
        <div className="loading-animation">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    );
  }

  // Step 1 → Intro dashboard
  if (step === 1) {
    return (
      <div className="main-dashboard">
        <img src={logo} alt="Tune Wave Logo" className="dashboard-logo" />
        <h1>Welcome to TUNE WAVE 🎧</h1>
        <p className="dashboard-content">Your personal music streaming space</p>
      </div>
    );
  }

  // Step 2 → Actual app
  if (step === 2) {
    return (
      <Router>
        <div
          className={`app-container ${theme}`}
          style={{ width: "100vw", padding: "20px" }}
        >
          <NavBar toggleTheme={toggleTheme} theme={theme} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/browse"
              element={<Browse onPlaySong={setCurrentSong} />}
            />
            <Route
              path="/playlist"
              element={<PlayListPage onPlaySong={setCurrentSong} />}
            />
            <Route
              path="/upload"
              element={<UploadPage onPlaySong={setCurrentSong} />}
            />
          </Routes>

          {/* 🎵 Global Music Player pinned at bottom */}
          <MusicPlayer currentSong={currentSong} />
        </div>
      </Router>
    );
  }

  return null; // fallback
}

export default App;
