import React, { useEffect, useState } from "react";
import "./PlayListPage.css";

function PlaylistPage() {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  useEffect(() => {
    const liked = JSON.parse(localStorage.getItem("likedSongs")) || [];
    const uploaded = JSON.parse(localStorage.getItem("uploadedSongs")) || [];
    const custom = JSON.parse(localStorage.getItem("customPlaylists")) || [];

    const likedPlaylist = {
      id: -1,
      name: "💖 Liked Songs",
      songs: liked,
      duration: liked.reduce((sum, s) => sum + (s.duration || 0), 0),
    };

    const localPlaylist = {
      id: -2,
      name: "📁 Local Device Songs",
      songs: uploaded,
      duration: uploaded.reduce((sum, s) => sum + (s.duration || 0), 0),
    };

    setPlaylists([likedPlaylist, localPlaylist, ...custom]);
  }, []);

  const createPlaylist = () => {
    if (!newPlaylistName.trim()) return;

    const newPlaylist = {
      id: Date.now(),
      name: newPlaylistName,
      songs: [],
      duration: 0,
    };

    const updated = [...playlists, newPlaylist];
    setPlaylists(updated);
    localStorage.setItem(
      "customPlaylists",
      JSON.stringify(updated.filter((p) => p.id > 0))
    );
    setNewPlaylistName("");
    alert("🎉 Playlist created!");
  };

  const deletePlaylist = (id) => {
    const updated = playlists.filter((p) => p.id !== id);
    setPlaylists(updated);
    localStorage.setItem(
      "customPlaylists",
      JSON.stringify(updated.filter((p) => p.id > 0))
    );
    if (selectedPlaylist?.id === id) setSelectedPlaylist(null);
    alert("🗑 Playlist deleted");
  };

  const removeSongFromPlaylist = (playlistId, songIndex) => {
    const updated = playlists.map((p) => {
      if (p.id === playlistId) {
        const newSongs = [...p.songs];
        newSongs.splice(songIndex, 1);
        const duration = newSongs.reduce((sum, s) => sum + (s.duration || 0), 0);
        return { ...p, songs: newSongs, duration };
      }
      return p;
    });

    setPlaylists(updated);
    localStorage.setItem(
      "customPlaylists",
      JSON.stringify(updated.filter((p) => p.id > 0))
    );
    alert("❌ Song removed from playlist");
  };

  return (
    <div className="playlist-container">
      <h2>🎶 Your Playlists</h2>

      <div className="create-section">
        <input
          type="text"
          value={newPlaylistName}
          placeholder="New playlist name"
          onChange={(e) => setNewPlaylistName(e.target.value)}
        />
        <button onClick={createPlaylist}>Create ➕</button>
      </div>

      <div className="playlist-list">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className={`playlist-card ${playlist.id < 0 ? "system" : ""}`}
            onClick={() => setSelectedPlaylist(playlist)}
          >
            <h3>{playlist.name}</h3>
            <p>{playlist.songs.length} songs</p>
            <p>⏱ {playlist.duration}s</p>
            {playlist.id > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deletePlaylist(playlist.id);
                }}
              >
                🗑 Delete
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedPlaylist && (
        <div className="playlist-details">
          <h3>{selectedPlaylist.name}</h3>
          {selectedPlaylist.songs.length === 0 ? (
            <p>No songs in this playlist.</p>
          ) : (
            <ul>
              {selectedPlaylist.songs.map((song, idx) => (
                <li key={idx}>
                  🎵 {song.name || song.title} — {song.duration || 0}s
                  {selectedPlaylist.id > 0 && (
                    <button onClick={() => removeSongFromPlaylist(selectedPlaylist.id, idx)}>
                      ❌
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default PlaylistPage;
