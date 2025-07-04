// src/components/SearchBar.js
import React, { useState } from "react";
import "./searchBar.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Call the parent component's search handler
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search songs, artists..."
        value={query}
        onChange={handleChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;