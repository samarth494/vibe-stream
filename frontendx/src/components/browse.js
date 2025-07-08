import React, { useEffect, useState } from "react";
import "./browse.css";

function Browse() {
  const [songs, setSongs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [likedSongs, setLikedSongs] = useState(() => {
    return JSON.parse(localStorage.getItem("likedSongs")) || [];
  });

  const [playlists, setPlaylists] = useState(() => {
    return JSON.parse(localStorage.getItem("customPlaylists")) || [];
  });

  const fetchSongs = () => {
    setLoading(true);
    setError(null);

    fetch(
      `https://api.jamendo.com/v3.0/tracks/?client_id=a600df40&format=json&limit=10&offset=${offset}&order=popularity_total`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (data.results.length > 0) {
          setSongs((prev) => {
            const newSongs = data.results.filter(
              (song) => !prev.some((s) => s.id === song.id)
            );
            return [...prev, ...newSongs];
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching songs:", err);
        setError("⚠ Failed to load songs. Please try again.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSongs();
  }, [offset]);

  const loadMore = () => setOffset((prev) => prev + 10);

  const toggleLike = (song) => {
    const exists = likedSongs.find((s) => s.id === song.id);
    const updatedLikes = exists
      ? likedSongs.filter((s) => s.id !== song.id)
      : [...likedSongs, { ...song, liked: true, fromDevice: false }];

    setLikedSongs(updatedLikes);
    localStorage.setItem("likedSongs", JSON.stringify(updatedLikes));
  };

  const addToPlaylist = (playlistId, song) => {
    const updated = playlists.map((p) => {
      if (p.id === parseInt(playlistId)) {
        const alreadyAdded = p.songs.some((s) => s.id === song.id);
        if (!alreadyAdded) {
          const newSongs = [...p.songs, { ...song, fromDevice: false }];
          const duration = newSongs.reduce((sum, s) => sum + (s.duration || 0), 0);
          return { ...p, songs: newSongs, duration };
        }
      }
      return p;
    });

    setPlaylists(updated);
    localStorage.setItem("customPlaylists", JSON.stringify(updated));
    alert("🎶 Added to playlist!");
  };

  return (
    
    <div className="browse-container">
      <h2 className="browse-title">🎧 Browse Free Music</h2>

      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

      {songs.length > 0 ? (
        <div className="song-list">
          {songs.map((song) => {
            const isLiked = likedSongs.some((s) => s.id === song.id);
            return (
              <div key={song.id} className="song-card">
                <img src={song.album_image} alt={song.name} />
                <div className="song-title">{song.name}</div>
                <div>{song.artist_name}</div>
                <audio controls src={song.audio} className="audio-player"></audio>

                <div className="song-actions">
                  <button
                    className={`like-btn ${isLiked ? "liked" : ""}`}
                    onClick={() => toggleLike(song)}
                  >
                    {isLiked ? "💖 Liked" : "🤍 Like"}
                  </button>

                  <select
                    className="playlist-select"
                    onChange={(e) => {
                      if (e.target.value) {
                        addToPlaylist(e.target.value, song);
                        e.target.value = "";
                      }
                    }}
                  >
                    <option value="">➕ Add to Playlist</option>
                    {playlists.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <a href={song.audio} download className="download-btn">
                  ⬇ Download
                </a>
              </div>
            );
          })}
        </div>
      ) : loading ? (
        <p>Loading songs...</p>
      ) : (
        <p>No songs found. Try again later.</p>
      )}

      <button onClick={loadMore} className="download-btn" style={{ marginTop: "30px" }}>
        Load More Songs
      </button>
    </div>
  );
}

export default Browse;
