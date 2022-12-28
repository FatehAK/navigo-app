const getUserLocation = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const latlng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        resolve(latlng);
      },
      err => {
        reject(err);
      },
      {
        timeout: 5000,
        maximumAge: 0,
        enableHighAccuracy: true,
      }
    );
  });

export default getUserLocation;
