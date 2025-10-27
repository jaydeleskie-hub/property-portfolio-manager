const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve React build folder
app.use(express.static(path.join(__dirname, 'frontend/build')));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is running!' });
});

app.get('/api/properties', (req, res) => {
  res.json([
    { id: 1, name: 'Sunset Villa', price: 450000, location: 'Malibu', beds: 4, baths: 3 },
    { id: 2, name: 'Downtown Loft', price: 320000, location: 'New York', beds: 1, baths: 1 },
    { id: 3, name: 'Lake House', price: 680000, location: 'Lake Tahoe', beds: 5, baths: 4 },
    { id: 4, name: 'Mountain Cabin', price: 299000, location: 'Aspen', beds: 2, baths: 2 }
  ]);
});

// Serve React app for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API: http://localhost:${PORT}/api/properties`);
});
