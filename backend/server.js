// Import required modules
const express = require('express');
const cors = require('cors');

// Create express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());               // Enable CORS for cross-origin requests
app.use(express.json());       // Parse JSON bodies in requests

// Root route (basic test)
app.get('/', (req, res) => {
  res.send('🎶 Vibe-Stream Backend is running!');
});

// Music list API route (dummy song data)
app.get('/api/music', (req, res) => {
  const songs = [
    { id: 1, title: 'Kesariya', artist: 'Arijit Singh' },
    { id: 2, title: 'Chaleya', artist: 'Arijit Singh' },
    { id: 3, title: 'Not Ramaiya Vastavaiya', artist: 'Arijit Singh' }
  ];
  res.json(songs);
});

// Start the server
app.listen(PORT, () => {
  console.log(`🎵 Server started on http://localhost:${PORT}`);
});

// Export app (for future testing or advanced usage)
module.exports = app;
const fileInput = document.getElementById('fileInput');
const audio = document.getElementById('audio');
const playPause = document.getElementById('playPause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const coverImg = document.getElementById('coverImg');
const trackTitle = document.getElementById('trackTitle');
const currentEl = document.getElementById('current');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const timeline = document.getElementById('timeline');

let playlist = [], currentIndex = 0;

fileInput.addEventListener('change', () => {
  playlist = Array.from(fileInput.files);
  if (playlist.length) {
    currentIndex = 0; loadTrack();
    document.querySelector('.player').style.display='block';
  }
});

function loadTrack() {
  const file = playlist[currentIndex];
  const url = URL.createObjectURL(file);
  audio.src = url;
  trackTitle.textContent = file.name.replace(/\.(mp3|wav|ogg)$/i, '');
  coverImg.src = ""; coverImg.style.display = 'none';
  audio.load();
}

playPause.addEventListener('click', () => {
  if(audio.paused) { audio.play(); playPause.textContent='⏸'; }
  else { audio.pause(); playPause.textContent='▶️'; }
});

audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = format(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  currentEl.textContent = format(audio.currentTime);
  progress.style.width = (audio.currentTime/audio.duration)*100 + '%';
});

timeline.addEventListener('click', e => {
  audio.currentTime = (e.offsetX/timeline.clientWidth)*audio.duration;
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadTrack(); audio.play(); playPause.textContent='⏸';
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadTrack(); audio.play(); playPause.textContent='⏸';
});

audio.addEventListener('ended', () => nextBtn.click());

function format(sec){
  const m = Math.floor(sec/60).toString().padStart(2,'0');
  const s = Math.floor(sec%60).toString().padStart(2,'0');
  return `${m}:${s}`;
}
