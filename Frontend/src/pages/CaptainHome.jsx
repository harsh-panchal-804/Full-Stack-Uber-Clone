import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { useEffect,useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import {CaptainDataContext} from '../context/CaptainContext'
import axios from 'axios'
import LiveTracking from '../components/LiveTracking'
import LiveTrackingSingle from '../components/LiveTrackingSingle'
import useMapStore from '../store/useMapStore'
function CaptainHome() {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false)
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)
  const [ride, setRide] = useState(null)
  const ridePopUpPanelRef = useRef(null)
  const confirmRidePopUpPanelRef = useRef(null)
  const { socket } = useContext(SocketContext);
  const {setDestination,setLocation}=useMapStore()
 
  const {captain}=useContext(CaptainDataContext)



  
   useEffect(()=>{ 
    console.log("here in socket")
    console.log(socket.connected)
    socket.on("destination-coordinates",(data)=>{
      setDestination({
        lat:data.destination.lat,
        lng:data.destination.lng
      })
      setLocation({
        lat:data.pickup.lat,
        lng:data.pickup.lng
      })
     
      // console.log(data)
    })
    return ()=>{
      socket.off("destination-coordinates")
    }
  },[socket])
    
  useEffect(()=>{
    console.log(captain)
    socket.emit('join',{
      userId:captain._id,
      userType:"captain"
    })
    const updateLocation=()=>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(async (position)=>{
          // console.log({
          //   userId:captain._id,
          //   location:{
          //     ltd:position.coords.latitude,
          //     lng:position.coords.longitude
          //   }})
          socket.emit("update-location-captain",{
            userId:captain._id,
            location:{
              ltd:position.coords.latitude,
              lng:position.coords.longitude
            }
          })
        })
      }
    }
    const locationInterval=setInterval(updateLocation,10000)
    updateLocation()
    return ()=>{
      clearInterval(locationInterval)
    }


  },[captain])
  
  socket.on("new-ride",(data)=>{
    console.log(data.ride)
    setRide(data.ride)
    setRidePopUpPanel(true)
  })
  async function confirmRide() {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
        rideId: ride._id,
        captainId: captain._id,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setRidePopUpPanel(false);
    } catch (error) {
      console.error("Error confirming ride:", error);
    }
  }


  useGSAP(function () {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(0)',
      });
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [ridePopUpPanel]);

  useGSAP(function () {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(0)',
      });
    } else {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [confirmRidePopUpPanel]);
  return (
    <div className='h-screen'>
      <div className='fixed p-3 top-0 flex items-center justify-between w-screen ' >
        <img className='w-16 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to="/captain-login" className=' h-10 rounded-full w-10 flex items-center justify-center bg-white'>
          <i className=" text-xl font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-3/5'>
        <LiveTrackingSingle/>
      </div>
      <div className='h-2/5 p-4 '>
        <CaptainDetails />
      </div>
      <div ref={ridePopUpPanelRef} className='fixed w-full z-10 my-1 translate-y-full  px-3 py-6 pt-12  bg-white bottom-0 p-5  '>
        <RidePopUp
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          confirmRide={confirmRide}
          ride={ride}
        />
      </div>
      <div ref={confirmRidePopUpPanelRef} className='fixed h-screen w-full z-10 my-1 translate-y-full  px-3 py-6 pt-12  bg-white bottom-0 p-5  '>
        <ConfirmRidePopUp
          ride={ ride}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          setRidePopUpPanel={setRidePopUpPanel}
        />
      </div>
    </div>
  )
}

export default CaptainHome;