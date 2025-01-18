import React, { useRef, useState,useContext, useEffect } from 'react'
import { Link ,useLocation } from 'react-router-dom'
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import FinishRide from '../components/FinishRide'
import { SocketContext } from '../context/SocketContext'

import LiveTrackingCaptain from "../components/LiveTrackingCaptain"

const CaptainRiding = () => {
    const [finshRidePanel,setFinishRidePanel]=useState(false)
    const finshRidePanelRef=useRef(null)
    const rideData=useLocation().state?.ride
    const {socket}=useContext(SocketContext)
   

    
      

    useGSAP(function() {
        if (finshRidePanel) {
          gsap.to(finshRidePanelRef.current, {
            transform: 'translateY(0)',
          });
        } else {
          gsap.to(finshRidePanelRef.current, {
            transform: 'translateY(100%)',
          });
        }
      }, [finshRidePanel]);
      
    
    return (
        <div className='h-screen overflow-y-hidden overflow-x-hidden'>
            <div className='fixed p-3 top-0 flex items-center justify-between w-screen ' >
                <img className='w-16 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to="/captain-home" className=' h-10 rounded-full w-10 flex items-center justify-center bg-white'>
                    <i className=" text-xl font-medium ri-logout-box-r-line"></i>
                </Link>
            </div> 
            <div className='h-4/5 w-full'>
               <LiveTrackingCaptain/>
            </div>
            <div onClick={()=>{setFinishRidePanel(true)}} className='h-1/5 p-6 pt-10 relative flex items-center justify-center bg-slate-400 '>
                <h5 className='  w-full p-3 text absolute top-[1%] left-[46%] '><i className=" text-2xl ri-arrow-up-wide-fill"> </i></h5>
                <button className='mt-5 mb-7 flex items-center justify-center text-white font-semibold rounded-full px-4 py-2 border w-full text-lg placeholder:text-base gap-3 cursor-pointer bg-gradient-to-r from-gray-800 to-black border-gray-600 hover:scale-105 duration-200 hover:text-gray-500 hover:border-gray-800 hover:from-black hover:to-gray-900'>Complete Ride</button>
            </div>
            <div ref={finshRidePanelRef} className='fixed w-full z-10 bg-slate-200  translate-y-full  px-3 py-6 pt-12   bottom-0   '>
                <FinishRide 
                    rideData={rideData}
                    setFinishRidePanel={setFinishRidePanel}
                />
            </div>

        </div>
    )
}

export default CaptainRiding