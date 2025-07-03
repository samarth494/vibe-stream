// Import required modules
const express = require('express');
const cors = require('cors');

// Create express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

// Test API route
app.get('/', (req, res) => {
  res.send('🎶 Vibe-Stream Backend is running!');
});

// Example music list API (dummy data)
app.get('/api/music', (req, res) => {
  const songs = [
    { id: 1, title: 'Kesariya', artist: 'Arijit Singh' },
    { id: 2, title: 'Chaleya', artist: 'Arijit Singh' },
    { id: 3, title: 'Not Ramaiya Vastavaiya', artist: 'Arijit Singh' }
  ];
  res.json(songs);
});

// Start server
app.listen(PORT, () => {
  console.log(`🎵 Server started on http://localhost:${PORT}`);
});

// Export app (for future testing if needed)
module.exports = app;
