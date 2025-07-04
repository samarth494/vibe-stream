import React, { useState } from 'react';
import './PlayListPage.css';

function PlaylistPage() {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const createPlaylist = () => {
    if (!newPlaylistName.trim()) return;
    const newPlaylist = {
      id: Date.now(),
      name: newPlaylistName,
      songs: [],
      duration: 0,
    };
    setPlaylists([...playlists, newPlaylist]);
    setNewPlaylistName('');
  };

  const deletePlaylist = (id) => {
    setPlaylists(playlists.filter((p) => p.id !== id));
    if (selectedPlaylist?.id === id) setSelectedPlaylist(null);
  };

  const addSongToPlaylist = (playlistId, song) => {
    setPlaylists(playlists.map((p) => {
      if (p.id === playlistId) {
        const updatedSongs = [...p.songs, song];
        const totalDuration = updatedSongs.reduce((sum, s) => sum + s.duration, 0);
        return { ...p, songs: updatedSongs, duration: totalDuration };
      }
      return p;
    }));
  };

  const removeSongFromPlaylist = (playlistId, songIndex) => {
    setPlaylists(playlists.map((p) => {
      if (p.id === playlistId) {
        const updatedSongs = [...p.songs];
        updatedSongs.splice(songIndex, 1);
        const totalDuration = updatedSongs.reduce((sum, s) => sum + s.duration, 0);
        return { ...p, songs: updatedSongs, duration: totalDuration };
      }
      return p;
    }));
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
          <div key={playlist.id} className="playlist-card">
            <h3 onClick={() => setSelectedPlaylist(playlist)}>{playlist.name}</h3>
            <p>{playlist.songs.length} songs</p>
            <p>⏱ {playlist.duration}s</p>
            <button onClick={() => deletePlaylist(playlist.id)}>🗑 Delete</button>
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
                  🎵 {song.title} — {song.duration}s
                  <button onClick={() => removeSongFromPlaylist(selectedPlaylist.id, idx)}>❌</button>
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