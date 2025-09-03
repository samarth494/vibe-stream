"use client"

import { useState, useRef, useEffect } from "react"
import "./UploadPage.css"

const UploadPage = ({ onPlaySong }) => {
  const [uploadedTracks, setUploadedTracks] = useState([])
  const [currentPlaying, setCurrentPlaying] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isUploading, setIsUploading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showFullScreen, setShowFullScreen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
  })

  const audioRef = useRef(null)

  // Convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  // Convert base64 back to blob URL
  const base64ToBlob = (base64Data, contentType) => {
    const byteCharacters = atob(base64Data.split(",")[1])
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: contentType })
    return URL.createObjectURL(blob)
  }

  // Load tracks from localStorage on component mount
  useEffect(() => {
    const loadSavedTracks = async () => {
      try {
        const savedTracks = localStorage.getItem("tuneWaveTracks")
        if (savedTracks) {
          const parsedTracks = JSON.parse(savedTracks)
          console.log("Loading saved tracks:", parsedTracks.length)

          // Convert base64 data back to blob URLs
          const tracksWithUrls = parsedTracks.map((track) => ({
            ...track,
            url: track.base64Data ? base64ToBlob(track.base64Data, track.fileType) : null,
          }))

          setUploadedTracks(tracksWithUrls)
          console.log("Tracks loaded successfully!")
        }
      } catch (error) {
        console.error("Error loading saved tracks:", error)
      }
    }

    loadSavedTracks()
  }, [])

  // Save tracks to localStorage whenever uploadedTracks changes
  useEffect(() => {
    const saveTracks = async () => {
      if (uploadedTracks.length > 0) {
        try {
          console.log("Saving tracks to localStorage...")
          // Save tracks with base64 data (without blob URLs)
          const tracksToSave = uploadedTracks.map((track) => ({
            id: track.id,
            title: track.title,
            artist: track.artist,
            uploadDate: track.uploadDate,
            fileName: track.fileName,
            fileSize: track.fileSize,
            fileType: track.fileType,
            base64Data: track.base64Data, // This contains the actual audio data
          }))

          localStorage.setItem("tuneWaveTracks", JSON.stringify(tracksToSave))
          console.log("Tracks saved successfully!")
        } catch (error) {
          console.error("Error saving tracks:", error)
          // If localStorage is full, try to clear some space
          if (error.name === "QuotaExceededError") {
            alert("Storage quota exceeded. Please clear some tracks to save new ones.")
          }
        }
      } else {
        // If no tracks, remove from localStorage
        localStorage.removeItem("tuneWaveTracks")
      }
    }

    saveTracks()
  }, [uploadedTracks])

  const handleFileInput = async (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith("audio/")) {
      setIsUploading(true)

      try {
        console.log("Converting file to base64...")
        // Convert file to base64 for permanent storage
        const base64Data = await fileToBase64(file)

        setTimeout(() => {
          const audioUrl = URL.createObjectURL(file)

          const newTrack = {
            id: Date.now(),
            title: formData.title || file.name.replace(/\.[^/.]+$/, ""),
            artist: formData.artist || "Unknown Artist",
            url: audioUrl,
            uploadDate: new Date().toLocaleDateString(),
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            base64Data: base64Data, // Store the actual audio data
          }

          setUploadedTracks((prev) => [...prev, newTrack])
          setFormData({ title: "", artist: "" })
          e.target.value = ""
          setIsUploading(false)
          setShowSuccess(true)

          console.log("Track added and will be saved permanently!")
          setTimeout(() => setShowSuccess(false), 3000)
        }, 1500)
      } catch (error) {
        console.error("Error processing file:", error)
        setIsUploading(false)
        alert("Error processing file. Please try again.")
      }
    }
  }

 // Update playTrack to also call global onPlaySong
const playTrack = (track) => {
  if (currentPlaying && currentPlaying.id === track.id) {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      if (onPlaySong) onPlaySong(track);   // 🔥 notify global player when resuming
    }
  } else {
    setCurrentPlaying(track);
    setIsPlaying(true);
    if (onPlaySong) onPlaySong(track);     // 🔥 notify global player when new track is clicked
  }
};



  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e) => {
    const progressBar = e.currentTarget
    const clickX = e.nativeEvent.offsetX
    const width = progressBar.offsetWidth
    const newTime = (clickX / width) * duration

    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const removeTrack = (trackId) => {
    const updatedTracks = uploadedTracks.filter((track) => track.id !== trackId)
    setUploadedTracks(updatedTracks)

    if (currentPlaying && currentPlaying.id === trackId) {
      setCurrentPlaying(null)
      setIsPlaying(false)
      setShowFullScreen(false)
    }

    console.log("Track removed and localStorage updated!")
  }

  const nextTrack = () => {
    if (!currentPlaying) return
    const currentIndex = uploadedTracks.findIndex((track) => track.id === currentPlaying.id)
    const nextIndex = (currentIndex + 1) % uploadedTracks.length
    setCurrentPlaying(uploadedTracks[nextIndex])
    setIsPlaying(true)
  }

  const prevTrack = () => {
    if (!currentPlaying) return
    const currentIndex = uploadedTracks.findIndex((track) => track.id === currentPlaying.id)
    const prevIndex = currentIndex === 0 ? uploadedTracks.length - 1 : currentIndex - 1
    setCurrentPlaying(uploadedTracks[prevIndex])
    setIsPlaying(true)
  }

  const openFullScreen = () => {
    console.log("Click detected! Current playing:", currentPlaying)
    if (currentPlaying) {
      console.log("Opening fullscreen...")
      setShowFullScreen(true)
    } else {
      console.log("No track playing")
    }
  }

  const closeFullScreen = () => {
    setShowFullScreen(false)
  }

  const clearLibrary = () => {
    if (
      window.confirm(
        "Are you sure you want to clear your entire music library? This will permanently delete all saved tracks.",
      )
    ) {
      setUploadedTracks([])
      setCurrentPlaying(null)
      setIsPlaying(false)
      setShowFullScreen(false)
      localStorage.removeItem("tuneWaveTracks")
      console.log("Library cleared and localStorage updated!")
    }
  }

  const exportLibrary = () => {
    try {
      const dataStr = localStorage.getItem("tuneWaveTracks")
      if (dataStr) {
        const dataBlob = new Blob([dataStr], { type: "application/json" })
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement("a")
        link.href = url
        link.download = `tunewave-library-${new Date().toISOString().split("T")[0]}.json`
        link.click()
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error("Error exporting library:", error)
    }
  }

  useEffect(() => {
    if (currentPlaying && audioRef.current) {
      audioRef.current.src = currentPlaying.url
      if (isPlaying) {
        audioRef.current.play()
      }
    }
  }, [currentPlaying])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && showFullScreen) {
        closeFullScreen()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [showFullScreen])

  return (
    <div className="upload-page">
      <div className="animated-bg">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
        <div className="floating-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
      </div>

      <div className="upload-container">
        {/* Header */}
        <div className="upload-header fade-in">
          <h1 className="glowing-text">
            <span className="music-icon">🎵</span>
            Upload & Play Music
            <span className="music-icon">🎵</span>
          </h1>
          <p className="subtitle">Create your personal music collection - Permanently Saved!</p>
        </div>

        {/* Success Animation */}
        {showSuccess && (
          <div className="success-popup slide-in">
            <div className="success-content">
              <span className="success-icon">✨</span>
              <span>Track saved permanently!</span>
              <span className="success-icon">✨</span>
            </div>
          </div>
        )}

        {/* Upload Section */}
        <div className="upload-section glass-card slide-up">
          <div className="upload-header-section">
            <h2 className="section-title">
              <span className="icon-bounce">📤</span>
              Add New Track
            </h2>
          </div>

          <div className="form-container">
            <div className="input-group">
              <div className="floating-label">
                <input
                  type="text"
                  placeholder=" "
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="floating-input"
                />
                <label className="floating-label-text">Track Title</label>
              </div>
            </div>

            <div className="input-group">
              <div className="floating-label">
                <input
                  type="text"
                  placeholder=" "
                  value={formData.artist}
                  onChange={(e) => setFormData((prev) => ({ ...prev, artist: e.target.value }))}
                  className="floating-input"
                />
                <label className="floating-label-text">Artist Name</label>
              </div>
            </div>

            <div className="file-upload-container">
              <input type="file" accept="audio/*" onChange={handleFileInput} id="audio-file" disabled={isUploading} />
              <label htmlFor="audio-file" className={`file-upload-btn ${isUploading ? "uploading" : ""}`}>
                {isUploading ? (
                  <>
                    <span className="spinner"></span>
                    Saving Permanently...
                  </>
                ) : (
                  <>
                    <span className="upload-icon">🎶</span>
                    Choose Audio File
                  </>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Music List */}
        <div className="music-list glass-card slide-up">
          <div className="list-header">
            <h2 className="section-title">
              <span className="icon-bounce">🎧</span>
              Your Music Library
              <span className="track-counter">{uploadedTracks.length} tracks</span>
            </h2>
            <div className="library-actions">
              <button className="export-library-button" onClick={exportLibrary}>
                📥 Export
              </button>
              <button className="clear-library-button" onClick={clearLibrary}>
                🗑️ Clear All
              </button>
            </div>
          </div>

          {uploadedTracks.length === 0 ? (
            <div className="no-tracks">
              <div className="empty-state">
                <span className="empty-icon">🎵</span>
                <p>No tracks uploaded yet</p>
                <p className="empty-subtitle">Upload your first track to get started!</p>
                <p className="storage-info">💾 All tracks are saved permanently in your browser</p>
              </div>
            </div>
          ) : (
            <div className="track-list">
              {uploadedTracks.map((track, index) => (
                <div
                  key={track.id}
                  className={`track-item ${currentPlaying && currentPlaying.id === track.id ? "playing" : ""}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => playTrack(track)}
                >
                  <div className="track-number">
                    {currentPlaying && currentPlaying.id === track.id && isPlaying ? (
                      <div className="playing-bars">
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                      </div>
                    ) : (
                      index + 1
                    )}
                  </div>

                  <div className="track-info">
                    <h3 className="track-title">{track.title}</h3>
                    <p className="track-artist">{track.artist}</p>
                    <small className="track-date">Added: {track.uploadDate} • 💾 Saved</small>
                  </div>

                  <div className="track-controls" onClick={(e) => e.stopPropagation()}>
                    <button className="control-btn play-btn" onClick={() => playTrack(track)}>
                      {currentPlaying && currentPlaying.id === track.id && isPlaying ? "⏸️" : "▶️"}
                    </button>

                    <button className="control-btn remove-btn" onClick={() => removeTrack(track.id)}>
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Enhanced Spotify-like Audio Player */}
        {currentPlaying && (
          <div className="spotify-player slide-up-player">
            <audio
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => {
                setIsPlaying(false)
                nextTrack()
              }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            <div className="player-container">
              {/* Enhanced Track Info Section - Clickable */}
              <div
                className="player-track-info clickable-area"
                onClick={() => {
                  console.log("Track info clicked!")
                  openFullScreen()
                }}
              >
                <div className="track-artwork">
                  <div className="artwork-glow"></div>
                  <span className="artwork-icon">🎵</span>
                </div>
                <div className="track-details">
                  <div className="track-name">{currentPlaying.title}</div>
                  <div className="artist-name">{currentPlaying.artist}</div>
                  <div className="click-hint">Click to expand</div>
                </div>
                <div className="expand-icon">⬆️</div>
              </div>

              {/* Enhanced Player Controls */}
              <div className="player-controls">
                <div className="control-buttons">
                  <button
                    className="control-button modern-btn"
                    onClick={prevTrack}
                    disabled={uploadedTracks.length <= 1}
                  >
                    <div className="btn-glow"></div>
                    <span className="control-icon">⏮️</span>
                  </button>

                  <button className="play-pause-button modern-play-btn" onClick={togglePlayPause}>
                    <div className="play-btn-glow"></div>
                    <span className="play-pause-icon">{isPlaying ? "⏸️" : "▶️"}</span>
                  </button>

                  <button
                    className="control-button modern-btn"
                    onClick={nextTrack}
                    disabled={uploadedTracks.length <= 1}
                  >
                    <div className="btn-glow"></div>
                    <span className="control-icon">⏭️</span>
                  </button>
                </div>

                {/* Enhanced Progress Bar */}
                <div className="progress-container">
                  <span className="time-display">{formatTime(currentTime)}</span>
                  <div className="progress-bar modern-progress" onClick={handleSeek}>
                    <div className="progress-background">
                      <div
                        className="progress-fill"
                        style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                      ></div>
                      <div
                        className="progress-handle"
                        style={{ left: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="time-display">{formatTime(duration)}</span>
                </div>
              </div>

              {/* Enhanced Volume Control */}
              <div className="volume-control modern-volume">
                <span className="volume-icon">🔊</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume * 100}
                  onChange={handleVolumeChange}
                  className="volume-slider modern-slider"
                />
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Full Screen Player */}
        {showFullScreen && currentPlaying && (
          <div className="fullscreen-player enhanced-fullscreen">
            <div className="fullscreen-overlay animated-overlay" onClick={closeFullScreen}></div>
            <div className="fullscreen-content enhanced-content">
              {/* Enhanced Close Button */}
              <button className="close-button modern-close-btn" onClick={closeFullScreen}>
                <div className="close-btn-glow"></div>
                <span className="close-icon">✕</span>
              </button>

              {/* Enhanced Album Art */}
              <div className="fullscreen-artwork enhanced-artwork">
                <div className="artwork-container">
                  <div className="rotating-artwork">
                    <div className="artwork-disc enhanced-disc">
                      <div className="disc-glow"></div>
                      <div className="artwork-center">
                        <span className="artwork-icon-large">🎵</span>
                      </div>
                      <div className="vinyl-lines">
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Track Info */}
              <div className="fullscreen-track-info enhanced-info">
                <h1 className="fullscreen-track-title enhanced-title">{currentPlaying.title}</h1>
                <h2 className="fullscreen-artist-name enhanced-artist">{currentPlaying.artist}</h2>
              </div>

              {/* Enhanced Progress Bar */}
              <div className="fullscreen-progress enhanced-progress">
                <div className="fullscreen-progress-container">
                  <span className="fullscreen-time">{formatTime(currentTime)}</span>
                  <div className="fullscreen-progress-bar enhanced-progress-bar" onClick={handleSeek}>
                    <div className="fullscreen-progress-background">
                      <div className="progress-glow"></div>
                      <div
                        className="fullscreen-progress-fill"
                        style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                      ></div>
                      <div
                        className="fullscreen-progress-handle enhanced-handle"
                        style={{ left: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="fullscreen-time">{formatTime(duration)}</span>
                </div>
              </div>

              {/* Enhanced Controls */}
              <div className="fullscreen-controls enhanced-controls">
                <button
                  className="fullscreen-control-btn enhanced-control-btn"
                  onClick={prevTrack}
                  disabled={uploadedTracks.length <= 1}
                >
                  <div className="control-btn-glow"></div>
                  <span className="fullscreen-control-icon">⏮️</span>
                </button>

                <button className="fullscreen-play-btn enhanced-play-btn" onClick={togglePlayPause}>
                  <div className="main-play-glow"></div>
                  <span className="fullscreen-play-icon">{isPlaying ? "⏸️" : "▶️"}</span>
                </button>

                <button
                  className="fullscreen-control-btn enhanced-control-btn"
                  onClick={nextTrack}
                  disabled={uploadedTracks.length <= 1}
                >
                  <div className="control-btn-glow"></div>
                  <span className="fullscreen-control-icon">⏭️</span>
                </button>
              </div>

              {/* Enhanced Volume Control */}
              <div className="fullscreen-volume enhanced-volume">
                <span className="fullscreen-volume-icon">🔊</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume * 100}
                  onChange={handleVolumeChange}
                  className="fullscreen-volume-slider enhanced-volume-slider"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UploadPage
