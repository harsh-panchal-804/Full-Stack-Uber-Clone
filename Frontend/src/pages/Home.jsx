"use client";
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import axios from 'axios'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmedVehicle from '../components/ConfirmedVehicle'
import WaitForDriver from '../components/WaitForDriver'
import LookingForDriver from '../components/LookingForDriver'
import useDebouncedFunction from '../hooks/useDebouncedFunction'
import {Label, TextInput} from 'flowbite-react'
import AlertComp from '../components/AlertComp'
import { SocketContext } from '../context/SocketContext'
import {UserDataContext} from '../context/userContext'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LiveTracking from '../components/LiveTracking';
import LiveTrackingSingle from '../components/LiveTrackingSingle';
import useMapStore from '../store/useMapStore.js'

const Home = () => {
  const [pickupLocation, setPickupLocation] = useState('')
  const [activeField, setActiveField] = useState(null)
  const [destinationLocation, setDestinationLocation] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmVehiclePanel, setConfirmVehiclePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [vehicleType, setVehicleType] = useState('')
  const [fare, setFare] = useState({})
  const [suggestionLoading, setSuggestionLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false);
  const [ride, setRide] = useState(null)
  const [from_here_pickup,setFrom_here_pickup]=useState(false)
  const [from_here_destination,setFrom_here_destination]=useState(false)
  const [coordinatesFetched,setCoordinatesFetched]=useState(false);

  const {location,destination,setLocation,setDestination}=useMapStore()
 
    
  //////////
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmVehicleRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const alertRef = useRef(null);

  const { socket} = useContext(SocketContext);
  const {user}=useContext(UserDataContext)
  const navigate=useNavigate()
  useEffect(()=>{
    // console.log(user)
    socket.emit('join',{
      userId:user._id,
      userType:"user"
    })
    return ()=>{
      socket.off("join")
    }
  },[user])
  useEffect(() => { 
    /// without use effect and removing socket listener this will run multiple times
    socket.on("ride-confirmed", async (ride) => {
      console.log("here");
      console.log(ride);
  
      if (coordinatesFetched) return; /// prune it 
  
      setRide(ride);
      setVehicleFound(false);
      setWaitingForDriver(true);
  
      const { pickup, destination: rideDestination } = ride;
  
      try {
        const pickupCoordinates = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-coordinates`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          params: {
            address: pickup,
          },
        });
  
        const destinationCoordinates = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-coordinates`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          params: {
            address: rideDestination,
          },
        });
  
        setCoordinatesFetched(true); 
        // console.log(pickupCoordinates.data);
        socket.emit("destination-coordinates",
          {
            pickup:{
              lat: pickupCoordinates.data.latitude,
              lng: pickupCoordinates.data.longitude,
            },
            destination:{
              lat: destinationCoordinates.data.latitude,  
              lng: destinationCoordinates.data.longitude,
            }
          }
        );
        console.log("socket data sendt")
        setLocation({
          lat: pickupCoordinates.data.latitude,
          lng: pickupCoordinates.data.longitude,
        });
  
        setDestination({
          lat: destinationCoordinates.data.latitude,
          lng: destinationCoordinates.data.longitude,
        });
      } catch (err) {
        console.log("error");
        console.log(err);
      }
    })
 
    return () => {
      socket.off("ride-confirmed"); 
    };
  }, [coordinatesFetched]); 
  socket.on("ride-started",(ride)=>{
    setWaitingForDriver(false)
    navigate("/riding",{state:{ride:ride}})
  })
  
  const handleDestinationChange = async (e) => {
    try {
      const value = e.target.value
      console.log("E.target  " +value)
      setSuggestionLoading(true)
      setDestinationLocation(e.target.value)
      console.log("State  " + destinationLocation)
      if (destinationLocation.length < 3) return
      if (destinationLocation.length < 3) return
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: destinationLocation },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setSuggestionLoading(false)
      console.log(response.data)
      setDestinationSuggestions(response.data)
    } catch (err) {
      setSuggestionLoading(false)
      console.log(err.message)
    }
  }
  const handlePickupChange = async (e) => {
    const value = e.target.value
    console.log("E.target  " +value)
    setSuggestionLoading(true)
    setPickupLocation(e.target.value)
    console.log("State  " +pickupLocation)
    if (pickupLocation.length < 3) return
    if (pickupLocation.length < 3) return
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: pickupLocation },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }

      })
      setSuggestionLoading(false)

      setPickupSuggestions(response.data)
      console.log(response.data)
    } catch (err) {
      setSuggestionLoading(false)
      setPanelOpen(false)
      setPickupLocation('')
      setDestinationLocation('')
      console.log(err.message)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    setDestinationLocation('')
    setPickupLocation('')
  }
  async function createRide(vehicleType) {
    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup: pickupLocation,
        destination: destinationLocation,
        vehicleType: vehicleType
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.message==="No captain found in the radius"){
          console.log("No homo")
          
          setVehicleFound(false)
          setVehiclePanel(false)
          setConfirmVehiclePanel(false)
          setFrom_here_destination(false)
          setFrom_here_pickup(false)
          setWaitingForDriver(false)
          setRide(null)
          setPickupLocation('')
          setDestinationLocation('')
          setPanelOpen(false)
          toast.error("No captain found in the radius")
          return
      }
    }
    catch(err){
      console.log(err.message)
    }


  }
  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        opacity: 1
      },)
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })

    }
    else (
      gsap.to(panelRef.current, {
        height: '0%',
        opacity: 0
      })),
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
  }, [panelOpen])

  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanel])
  useGSAP(function () {
    if (confirmVehiclePanel) {
      gsap.to(confirmVehicleRef.current, {
        transform: 'translateY(0)',
        height: '85%'
      })
    }
    else {
      gsap.to(confirmVehicleRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmVehiclePanel])
  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)',
        height: '91%'
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [vehicleFound]);

  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)',
        height: '75%'
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [waitingForDriver]);
  useGSAP(function () {
    if (showAlert) {
        gsap.to(alertRef.current, {
            opacity: 1,
            duration: 1,
        });
    } else {
        gsap.to(alertRef.current, {
            opacity: 0,
            duration: 1,
        });
    }
}, [showAlert]);
  const debouncedhandleDestinationChange = useDebouncedFunction(handleDestinationChange, 500);
  const debouncedhandlePickupChange = useDebouncedFunction(handlePickupChange, 500);

  return (
    <div className='h-screen relative overflow-hidden'>
      <div className='opacity-0 w-full absolute top-[7%] right-0' ref={alertRef}>
                    <AlertComp 
                        message1="Oops!"
                        message2="No route Found"
                     />
                </div>
      <img className='w-16 absolute left-5 top-5 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="uber-logo"></img>
      <div className={`h-[72%] w-full ${panelOpen? "":"z-10"}  relative`}>
            <LiveTrackingSingle/>
          </div>
      <div className=' flex flex-col  justify-end h-screen absolute top-0 w-full '>
        <div className='h-[30%] bg-white relative p-5'>
          <h5 ref={panelCloseRef} onClick={() => setPanelOpen(false)} className=' opacity-0 absolute top-1 right-6 text-2xl'><i className="ri-arrow-down-wide-line"></i></h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            {/* <div className='line absolute z-10  h-14 w-0.5 left-[27%] top-[55%] rounded-full bg-gray-900'></div> */}
            <div className=" block">
                <Label htmlFor="pickup" className='text-sm' value="Pickup Location"
                  color={pickupLocation.length < 3 && pickupLocation !== '' ? "failure" : "default"}
                />
              </div>
            <TextInput
              id="pickup"
              sizing='sm'
              className='w-50 text-ellipsis'
              value={pickupLocation}
              onClick={(e) => {
                setPanelOpen(true);
                setActiveField('pickup');
                setPickupLocation(e.target.value);
              }}
              onKeyUp={(e)=>{
                if(e.key=="Backspace"){
                  setFrom_here_pickup(false)
                }
              }}
              onChange={(e) => {
                debouncedhandlePickupChange(e);
                setPickupLocation(e.target.value);
              }}
              color={pickupLocation.length < 3 && pickupLocation !== '' ? "failure" : "default"}
              helperText={pickupLocation.length < 3 && pickupLocation !== '' ?
                <><span className="font-medium">Oops!</span> Pickup must have a length of 3!</> : null
              }
            
              placeholder="Enter your location"
              required  ></TextInput>
            <div className=" block">
                <Label htmlFor="destination" className='text-sm' value="Destination Location"
                  color={destinationLocation.length < 3 && destinationLocation !== '' ? "failure" : "default"}
                />
              </div>
            <TextInput
              id="destination"
              sizing='sm'
              className='w-50 text-ellipsis'
              value={destinationLocation}
              onClick={() => {
                setPanelOpen(true);
                setActiveField('destination');
              }}
              onChange={(e) => {
                setDestinationLocation(e.target.value);
                debouncedhandleDestinationChange(e);
              }}
              onKeyUp={(e)=>{
                if(e.key=="Backspace"){
                  setFrom_here_destination(false)
                }
              }}
              color={(destinationLocation.length < 3 && destinationLocation !== '') ? "failure" : "default"}
              helperText={destinationLocation.length < 3 && destinationLocation !== '' ?
                <><span className="font-medium">Oops!</span> Destination must have a length of 3!</> : null
              }
              placeholder="Enter your destination"
              required  ></TextInput>
          </form>
          
        </div>
        <div ref={panelRef} className='bg-white h-0'>
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            activeField={activeField}
            setPickupLocation={setPickupLocation}
            setDestinationLocation={setDestinationLocation}
            pickupLocation={pickupLocation}
            destinationLocation={destinationLocation}
            setFare={setFare}
            suggestionLoading={suggestionLoading}
            setShowAlert={setShowAlert}
            from_here_pickup={from_here_pickup}
            from_here_destination={from_here_destination}
            setFrom_here_destination={setFrom_here_destination}
            setFrom_here_pickup={setFrom_here_pickup}

          />
        </div>
      </div>
      <div ref={vehiclePanelRef} className='fixed w-full z-10  translate-y-full pb-4 py-6 pt-10  bg-white bottom-0 p-5  '>
        <VehiclePanel
          setVehiclePanel={setVehiclePanel}
          setConfirmVehiclePanel={setConfirmVehiclePanel}
          fare={fare}
          setVehicleType={setVehicleType}
        />
      </div>
      <div ref={confirmVehicleRef} className='fixed w-full h-0 z-10 my-1 translate-y-full  px-3 py-6 pt-12  bg-white bottom-0 p-5  '>
        <ConfirmedVehicle
          setVehicleFound={setVehicleFound}
          setConfirmVehiclePanel={setConfirmVehiclePanel}
          createRide={createRide}
          pickupLocation={pickupLocation}
          destinationLocation={destinationLocation}
          vehicleType={vehicleType}
          fare={fare}
         
        />
      </div>
      <div ref={vehicleFoundRef} className='fixed h-0 w-full z-10 my-1 translate-y-full px-3 py-6 pt-12 bg-white bottom-0 p-5'>
        <LookingForDriver
          setVehicleFound={setVehicleFound}
          setConfirmVehiclePanel={setConfirmVehiclePanel}
          setWaitingForDriver={setWaitingForDriver}
          pickupLocation={pickupLocation}
          destinationLocation={destinationLocation}
          vehicleType={vehicleType}
          fare={fare}

        />
      </div>
      <div ref={waitingForDriverRef} className='fixed h-0 w-full z-10 my-1 translate-y-full  px-3 py-6 pt-12 bg-white bottom-0 p-5'>
        <WaitForDriver
          ride={ride}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>



    </div>
  )
}

export default Home