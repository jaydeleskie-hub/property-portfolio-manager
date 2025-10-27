const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('/api/properties', (req, res) => {
  res.json([
    { id: 1, name: 'Sunset Villa', price: 450000, location: 'Malibu', beds: 4, baths: 3 },
    { id: 2, name: 'Downtown Loft', price: 320000, location: 'New York', beds: 1, baths: 1 },
    { id: 3, name: 'Lake House', price: 680000, location: 'Lake Tahoe', beds: 5, baths: 4 },
    { id: 4, name: 'Mountain Cabin', price: 299000, location: 'Aspen', beds: 2, baths: 2 }
  ]);
});

app.get('/api/images', (req, res) => {
  const images = [
    { id: 1, image: 'https://source.unsplash.com/400x250/?malibu,beach,house' },
    { id: 2, image: 'https://source.unsplash.com/400x250/?new,york,loft,city' },
    { id: 3, image: 'https://source.unsplash.com/400x250/?lake,tahoe,house,water' },
    { id: 4, image: 'https://source.unsplash.com/400x250/?aspen,mountain,cabin,snow' }
  ];
  res.json(images);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
