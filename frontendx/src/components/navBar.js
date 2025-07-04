import React from "react";
import { Link } from "react-router-dom";
import "./musicPlayer.css";

function NavBar({ toggleTheme, theme }) {
  return (
    <div className="navbar">
      <div className="logo">🎵 TUNE WAVE</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/browse">Browse</Link></li>
<li><Link to="/playlist">🎶 Playlists</Link></li>
        <li><Link to="#">Upload</Link></li>
        <li><Link to="#">About</Link></li>
        <button onClick={toggleTheme} className="theme-toggle-btn">
  {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>

      </ul>
    </div>
  );
}

export default NavBar;
