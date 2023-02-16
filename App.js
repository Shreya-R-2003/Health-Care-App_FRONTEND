import React, { useState, useEffect } from 'react';

const UserLocationSearch = () => {
  const [userLocation, setUserLocation] = useState({});

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

  const handleSearch = async () => {
    const response = await fetch('http://localhost:8800/api/pins/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        loc: {
          type: 'Point',
          coordinates: [parseFloat(userLocation.lng), parseFloat(userLocation.lat)],
        },
      }),
    });
  
    const data = await response.json();
    console.log(data);
  };
  
  return (
    <div>
      <p>User location: {userLocation.lat}, {userLocation.lng}</p>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default UserLocationSearch;













// // import React, { useState, useEffect } from "react";
// // import "./App.css";

// // function App() {
// //   const [message, setMessage] = useState("");

// //   useEffect(() => {
// //     fetch("http://localhost:8800/message")
// //       .then((res) => res.json())
// //       .then((data) => setMessage(data.message));
// //   }, []);

// //   return (
// //     <div className="App">
// //       <h1>{message}</h1>
// //     </div>
// //   );
// // }
// // //here
// // import React, { useState, useEffect } from 'react';

// // const UserLocationSearch = () => {
// //   const [userLocation, setUserLocation] = useState({});

// //   useEffect(() => {
// //     navigator.geolocation.getCurrentPosition(
// //       (position) => {
// //         setUserLocation({
// //           lat: position.coords.latitude,
// //           lng: position.coords.longitude,
// //         });
// //       },
// //       (error) => console.error(error)
// //     );
// //   }, []);

// //   return (
// //     <div>
// //       <p>User location: {userLocation.lat}, {userLocation.lng}</p>
// //     </div>
// //   );
// // };


// // export default UserLocationSearch;
// // //here

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UserLocationSearch = () => {
//   const [userLocation, setUserLocation] = useState({});

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setUserLocation({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         });
//       },
//       (error) => console.error(error)
//     );
//   }, []);

//   const handleSearch = () => {
//     axios
//       .get(`http://localhost:8800/search/location`, {
//         params: {
//           lat: userLocation.lat,
//           lng: userLocation.lng,
//         },
//       })
//       .then((response) => {
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return (
//     <div>
//       <p>User location: {userLocation.lat}, {userLocation.lng}</p>
//       <button onClick={handleSearch}>Search</button>
//     </div>
//   );
// };

// export default UserLocationSearch;