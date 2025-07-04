import React, { useEffect, useState } from "react";
import "./browse.css";  // ✅ make sure this line is added

function Browse() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("https://itunes.apple.com/search?term=kesariya&media=music&limit=5")
      .then((res) => res.json())
      .then((data) => setSongs(data.results))
      .catch((err) => console.error("Error fetching songs:", err));
  }, []);

  return (
    <div className="browse-container">
      <h2 className="browse-title">🎶 Browse Free Music (iTunes API)</h2>
      {songs.length > 0 ? (
        <div className="song-list">
          {songs.map((song) => (
            <div key={song.trackId} className="song-card">
              <img src={song.artworkUrl100} alt={song.trackName} />
              <div className="song-title">{song.trackName}</div>
              <p style={{ marginBottom: "10px", color: "#f8f8f2" }}>
                by {song.artistName}
              </p>
              <audio controls className="audio-player">
                <source src={song.previewUrl} type="audio/mpeg" />
              </audio>
              <a
                href={song.previewUrl}
                download
                className="download-btn"
              >
                Download Preview
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: "#8be9fd", textAlign: "center", marginTop: "30px" }}>
          Loading songs...
        </p>
      )}
    </div>
  );
}

export default Browse;
