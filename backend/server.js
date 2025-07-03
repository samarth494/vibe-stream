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
