import React, { useState, useEffect } from 'react';

const UserLocationSearch = () => {
  const [userLocation, setUserLocation] = useState({});
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => console.error(error)
    );
  }, []);

  const handleDistanceChange = (event) => {
    setDistance(parseFloat(event.target.value));
  };

  const handleSearch = async () => {
    const response = await fetch('http://localhost:8800/api/pins/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dist: distance,
        loc: {
          type: 'Point',
          coordinates: [userLocation.lng, userLocation.lat],
        },
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <p>User location: {userLocation.lat}, {userLocation.lng}</p>
      <label>
        Distance (in meters):
        <input type="number" value={distance} onChange={handleDistanceChange} />
      </label>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default UserLocationSearch;
