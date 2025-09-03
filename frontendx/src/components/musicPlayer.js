import "./musicPlayer.css";
import React, { useEffect, useRef, useState } from "react";

const MusicPlayer = ({ currentSong }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // get playable URL depending on object type
  const getSongUrl = (song) => {
    if (!song) return null;
    if (song.url) return song.url;              // songs from API
    if (song.audio) return song.audio;          // Jamendo / other APIs
    if (song.preview) return song.preview;      // preview links
    if (song.src) return song.src;              // custom src
    if (song instanceof File) return URL.createObjectURL(song); // local file
    return null;
  };

  const songUrl = getSongUrl(currentSong);

  useEffect(() => {
    if (songUrl && audioRef.current) {
      audioRef.current.src = songUrl; // set correct source
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Autoplay blocked:", err));
    }
  }, [songUrl]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  if (!currentSong) {
    return <div className="music-player">🎧 Select a song to play</div>;
  }

  return (
    <div className="music-player">
      <h3>🎵 Now Playing: {currentSong.name || currentSong.title || "Untitled"}</h3>
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} controls />
      <div className="controls">
        <button onClick={togglePlayPause}>
          {isPlaying ? "⏸️ Pause" : "▶️ Play"}
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
