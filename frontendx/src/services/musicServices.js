// musicService.js

// Define your backend API URL
const API_URL = 'http://localhost:5000/api/music';

/**
 * Fetch all songs from the backend API
 * @returns {Promise<Array>} List of songs in JSON format
 */
export async function fetchSongs() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch songs');
    }
    const songs = await response.json();
    return songs;
  } catch (error) {
    console.error('Error fetching songs:', error);
    return []; // Return empty array on error
  }
}
