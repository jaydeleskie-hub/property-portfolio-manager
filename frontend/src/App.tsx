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

function App() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => setProperties(data))
      .finally(() => setLoading(false));
  }, []);

  const formatPrice = (price: number) => `$${(price / 1000).toFixed(0)}K`;

  const getImageUrl = (location: string) => {
    const images: { [key: string]: string } = {
      'Malibu': 'https://source.unsplash.com/400x250/?malibu,beach,house,sunset',
      'New York': 'https://source.unsplash.com/400x250/?new,york,city,loft,skyline',
      'Lake Tahoe': 'https://source.unsplash.com/400x250/?lake,tahoe,house,water,mountains',
      'Aspen': 'https://source.unsplash.com/400x250/?aspen,colorado,mountain,cabin,snow'
    };
    return images[location] || 'https://source.unsplash.com/400x250/?luxury,house';
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="App">
      <header className="header">
        <h1>Property Portfolio</h1>
        <p>{properties.length} Properties Available</p>
      </header>

      <div className="grid">
        {properties.map(property => (
          <div key={property.id} className="card">
            <div
              className="image-placeholder"
              style={{
                backgroundImage: `url(${getImageUrl(property.location)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '180px'
              }}
            />
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
        ))}
      </div>
    </div>
  );
}

export default App;
