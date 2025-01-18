import React, { useState, useEffect,useContext } from "react";
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import useMapStore from '../store/useMapStore.js'
import  {SocketContext}  from '../context/SocketContext'
const LiveTrackingCaptain = () => {
  const location=useMapStore((state)=>state.location)
  const destination=useMapStore((state)=>state.destination)
  const setLocation=useMapStore((state)=>state.setLocation) 
  const setDestination=useMapStore((state)=>state.setDestination)
  


  
 
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [shouldFetchDirections, setShouldFetchDirections] = useState(false); // Trigger for fetching directions
  const [mapLoaded, setMapLoaded] = useState(false); // Track if map has loaded
  const handleDirectionsCallback = (response) => {
    if (response && response.status === "OK") {
      console.log("Directions response:", response);
      setDirectionsResponse(response);
      setShouldFetchDirections(false); // Stop further requests after successful response
    } else {
      console.error("Error fetching directions:", response);
    }
  };
  


  const mapContainerStyle = { width: "100%", height: "100%" };
  const center = location || { lat: 37.7749, lng: -122.4194 };

  const onLoad = () => {
    setMapLoaded(true); // Set mapLoaded to true once the map is ready
  };

  useEffect(() => {
    if (location && destination) {
      setShouldFetchDirections(true); // Trigger DirectionsService when both location and destination are available
    }
  }, [location, destination]);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOMAPS_API_KEY} onLoad={onLoad}>
      {mapLoaded && location && (
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
          {/* Marker for user's location */}
          {/* {location && <Marker position={location} />} */}

          {/* Render destination marker and route only if destination is set */}
          {destination && (
            <>
              {/* <Marker position={destination} /> */}
              {/* Trigger DirectionsService to fetch directions only if both location and destination are available */}
              {shouldFetchDirections && location && destination && (
                <DirectionsService
                  options={{
                    origin: location,
                    destination: destination,
                    travelMode: "DRIVING",
                  }}
                  callback={handleDirectionsCallback}
                />
              )}
              {/* Render directions if available */}
              {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
            </>
          )}
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default LiveTrackingCaptain;
