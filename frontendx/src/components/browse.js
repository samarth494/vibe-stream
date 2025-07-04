import React, { useEffect, useState } from "react";
import "./browse.css";

function Browse() {
  const [songs, setSongs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchSongs = () => {
    setLoading(true);
    fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=a600df40&format=json&limit=10&offset=${offset}&order=popularity_total`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results.length > 0) {
          setSongs((prev) => [...prev, ...data.results]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching songs:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSongs();
  }, [offset]);

  const loadMore = () => {
    setOffset((prev) => prev + 10);
  };

  return (
    <div className="browse-container">
      <h2 className="browse-title">🎶 Browse Free Music</h2>

      {songs.length > 0 ? (
        <div className="song-list">
          {songs.map((song) => (
            <div key={song.id} className="song-card">
              <img src={song.album_image} alt={song.name} />
              <div className="song-title">{song.name}</div>
              <div>{song.artist_name}</div>
              <audio controls src={song.audio} className="audio-player"></audio>
              <a
                href={song.audio}
                download
                className="download-btn"
              >
                ⬇️ Download
              </a>
            </div>
          ))}
        </div>
      ) : (
        loading ? <p>Loading songs...</p> : <p>No songs found. Try again later.</p>
      )}

      <button onClick={loadMore} className="download-btn" style={{ marginTop: "30px" }}>
        Load More Songs
      </button>
    </div>
  );
}

export default Browse;
