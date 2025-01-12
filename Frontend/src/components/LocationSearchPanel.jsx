import React, { useEffect, useRef, useState } from 'react';
import "remixicon/fonts/remixicon.css";
import axios from 'axios';
import LoadingAnimation from './LoadingAnimation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'

const LocationSearchPanel = ({
  setVehiclePanel,
  setPanelOpen,
  activeField,
  suggestions,
  setPickupLocation,
  setDestinationLocation,
  pickupLocation,
  destinationLocation,
  setFare,
  suggestionLoading,
  setShowAlert,
  from_here_pickup,
  from_here_destination,
  setFrom_here_pickup,
  setFrom_here_destination
}) => {
  const loadingRef=useRef(null)
  
  useGSAP(function () {
    if(suggestionLoading){
      gsap.to(loadingRef.current, {
        opacity: 1,
        duration: 5
      })
    }
    else{
      gsap.to(loadingRef.current, {
        opacity: 0,
        duration: 5
      })
    }
  }, [suggestionLoading])
  async function fetch(){
      console.log("PickupLocation  " +pickupLocation)
      console.log("DestinationLocation  " +destinationLocation)
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
          {
            params: { pickup: pickupLocation, destination: destinationLocation },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setVehiclePanel(true);
        setPanelOpen(false);
        setFare(response.data);
      } catch (error) {
        console.log(error.message);
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
          setPickupLocation('')
          setDestinationLocation('')
          setFrom_here_pickup(false)
          setFrom_here_destination(false)
        }, 2000)
        setPanelOpen(false)
        console.error("Error fetching fare:", error.message);
      }
  }
  const handleSuggestionClick = async (suggestion) => {
    if (activeField === 'pickup') {
      setPickupLocation(suggestion);
      setFrom_here_pickup(true)
    } else if (activeField === 'destination') {
      setDestinationLocation(suggestion);
      setFrom_here_destination(true)
    }
  };
  useEffect(() => {
    if(from_here_pickup && from_here_destination && pickupLocation !== '' && destinationLocation !== ''){
        fetch()
    }
    },[from_here_pickup,from_here_destination,pickupLocation,destinationLocation])
  if (suggestionLoading) {
    return (
      <div ref={loadingRef}  className='flex opacity-0 justify-center items-center flex-col absolute bottom-[43%] left-[50%]'> 
        <LoadingAnimation />
      </div>

    )
  }
  else {
    return (
      <div className=''>
        {suggestions.map((elem, idx) => (
          <div
            key={idx}
            onClick={() => handleSuggestionClick(elem.description)}
            className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-base">{elem.description}</h4>
          </div>
        ))}
      </div>



    );
  }


};

export default LocationSearchPanel;
