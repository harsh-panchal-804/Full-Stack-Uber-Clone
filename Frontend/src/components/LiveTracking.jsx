import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const LiveTracking = () => {
  const [location, setLocation] = useState({ lat: 37.7749, lng: -122.4194 }); // Default location (San Francisco)

  useEffect(() => {
    const fetchLiveLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    };

    fetchLiveLocation();

    // Poll location every 5 seconds (adjust as needed)
    const intervalId = setInterval(fetchLiveLocation, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = location;

  return (
    <LoadScript googleMapsApiKey="AlzaSyxuamF31JyCDaJ58dmNTe4L4uTu0mE4eKA">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
      >
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
};

export default LiveTracking;
