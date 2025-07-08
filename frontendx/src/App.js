import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from "./assets.png";
import "./App.css"; // Your provided CSS file
import SearchBar from "./components/searchBar";
import MusicPlayer from "./components/musicPlayer";
import NavBar from "./components/navBar";
import Browse from "./components/browse";
import Home from "./components/home";
import PlayListPage from "./components/PlayListPage";
import UploadPage from "./components/UploadPage"; // Import the new UploadPage component

function App() {
  const [step, setStep] = useState(0);
  const [theme, setTheme] = useState("dark"); // Default theme is dark

  // Function to toggle between dark and light themes
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    document.body.className = theme; // Apply the theme class to body tag
  }, [theme]);

  // Handle loading screens and transitions
  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 4000);
    const timer2 = setTimeout(() => setStep(2), 7000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Conditional rendering based on loading steps
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

  if (step === 1) {
    return (
      <div className="main-dashboard">
        <img src={logo} alt="Tune Wave Logo" className="dashboard-logo" />
        <h1>Welcome to TUNE WAVE 🎧</h1>
        <p className="dashboard-content">Your personal music streaming space</p>
      </div>
    );
  }

  if (step === 2) {
    return (
      <Router>
        <div className={`app-container ${theme}`} style={{ width: "100vw", padding: "20px" }}>
          <NavBar toggleTheme={toggleTheme} theme={theme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/playlist" element={<PlayListPage />} />
            <Route path="/upload" element={<UploadPage />} /> {/* Add the Upload page route */}
          </Routes>
        </div>
      </Router>
    );
  }

  return null; // Fallback if no step matched
}

export default App;
