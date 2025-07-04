import React from 'react';
import './navBar.css';  // Don't forget to create this CSS file for styling

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">🎶 Vibe-Stream</div>
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Browse</a></li>
        <li><a href="#">My Playlist</a></li>
        <li><a href="#">Upload</a></li>
        <li><a href="#">About</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;
