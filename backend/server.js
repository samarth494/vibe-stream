const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test API
app.get('/', (req, res) => {
  res.send('Vibe-Stream Backend is Running!');
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});