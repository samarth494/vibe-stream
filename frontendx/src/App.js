import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from "./assets.png";
import "./App.css";
import SearchBar from "./components/searchBar";
import MusicPlayer from "./components/musicPlayer";
import NavBar from "./components/navBar";
import Browse from "./components/browse";
import Home from "./components/home";

function App() {
  const [step, setStep] = useState(0);
  const [theme, setTheme] = useState("dark");  // 👈 theme state

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 4000);
    const timer2 = setTimeout(() => setStep(2), 7000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);
useEffect(() => {
  document.body.className = theme;   // ✅ Apply theme class to body tag
}, [theme]);

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
          <Route
            path="/player"
            element={
              <>
                <SearchBar onSearch={(query) => console.log("Searching for:", query)} />
                <MusicPlayer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}


  // Fallback if no step matched
  return null;
}

export default App;
