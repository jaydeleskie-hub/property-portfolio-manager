import React, { useState, useEffect } from 'react';
import './App.css';

interface Property {
  id: number;
  name: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
}

interface Image {
  id: number;
  image: string;
}

function App() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch properties
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => setProperties(data));

    // NEW: Fetch images
    fetch('/api/images')
      .then(res => res.json())
      .then(data => setImages(data));

    setLoading(false);
  }, []);

  const formatPrice = (price: number) => `$${(price / 1000).toFixed(0)}K`;

  if (loading) {
    return <div className="loading">Loading properties...</div>;
  }

  return (
    <div className="App">
      <header className="header">
        <h1>Property Portfolio</h1>
        <p>{properties.length} Properties Available</p>
      </header>

      <div className="grid">
        {properties.map(property => {
          const propImage = images.find(img => img.id === property.id);
          return (
            <div key={property.id} className="card">
              <div className="image-placeholder" style={{ backgroundImage: `url(${propImage?.image || 'https://via.placeholder.com/400x250?text=House'})` }}>
                {propImage ? null : <span role="img" aria-label="house">House</span>}
              </div>
              <div className="content">
                <h3>{property.name}</h3>
                <p className="location">{property.location}</p>
                <p className="price">{formatPrice(property.price)}</p>
                <div className="details">
                  <span>{property.beds} bed{property.beds > 1 ? 's' : ''}</span>
                  <span>{property.baths} bath{property.baths > 1 ? 's' : ''}</span>
                </div>
                <button className="btn">View Details</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
