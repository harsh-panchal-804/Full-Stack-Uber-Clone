import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import useMapStore from '../store/useMapStore.js';

const LiveTrackingSingle = () => {
  const { location, setLocation } = useMapStore();
  const [mapLoaded, setMapLoaded] = useState(false); // Track if map has loaded

  useEffect(() => {
    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          // console.log("User location:", userLocation);
          setLocation(userLocation);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setLocation({ lat: 37.7749, lng: -122.4194 }); // Default to San Francisco if error occurs
        }
        // { enableHighAccuracy: true }
      );
    };
    fetchLocation();
  }, [setLocation]);

  const mapContainerStyle = { width: "100%", height: "100%" };
  const center = location || { lat: 37.7749, lng: -122.4194 };

  const onLoad = () => {
    setMapLoaded(true); // Set mapLoaded to true once the map is ready
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOMAPS_API_KEY} onLoad={onLoad}>
      {mapLoaded && location && (
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
          {/* Marker for user's location */}
          {location && <Marker position={location} />}
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default LiveTrackingSingle;
