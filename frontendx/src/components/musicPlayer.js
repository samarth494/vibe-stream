import './musicPlayer.css'; // isme styling dal lena
import React, { useEffect, useRef, useState } from 'react';

const MusicPlayer = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
const handleFileChange = (e) => {
  const files = Array.from(e.target.files);
  setPlaylist(files);
  setCurrentIndex(0);
};

useEffect(() => {
  if (playlist.length > 0 && audioRef.current) {
    audioRef.current.load();
  }
}, [playlist]);

  const loadTrack = (index) => {
    setCurrentIndex(index);
    audioRef.current.load();
    audioRef.current.play();
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    loadTrack(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % playlist.length;
    loadTrack(nextIndex);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="music-player">
      <h2>🎵 Music Player</h2>
      <input type="file" multiple accept="audio/*" onChange={handleFileChange} />

      {playlist.length > 0 && (
        <>
          <audio ref={audioRef} onEnded={handleNext}>
            <source src={URL.createObjectURL(playlist[currentIndex])} />
          </audio>

          <h3>{playlist[currentIndex].name.replace(/\.(mp3|wav|ogg)$/i, '')}</h3>

          <div className="controls">
            <button onClick={handlePrev}>⏮️</button>
            <button onClick={togglePlayPause}>{isPlaying ? '⏸️' : '▶️'}</button>
            <button onClick={handleNext}>⏭️</button>
          </div>
        </>
      )}
    </div>
  );
};

export default MusicPlayer;
