import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import SVGWithAnimation from '../components/SVGWithAnimations'
const CaptainEnd = () => {
    const rideData = useLocation().state?.ride
    return (
        <div className='h-screen w-full flex flex-col items-center justify-center bg-black'>
            <h1 className='text-white text-2xl font-light'>Ride Completed</h1>
            <br></br>
            <h1 className='text-white text-center text-lg font-light'>From <span className='text-yellow-300'> {rideData?.pickup}</span> </h1>
            <br></br>

            <h1 className='text-white text-center text-lg font-light'>To <span className='text-yellow-300'> {rideData?.destination}</span> </h1>
            <br></br>
            <br></br>
            <h1 className='text-white text-3xl font-light'>Earned ₹{rideData?.fare} </h1>
            <br></br>
            <SVGWithAnimation />
            <br></br>
            <div>
                <Link to="/captain-home" className='bg-yellow-500 mb-7 flex items-center justify-center border-yellow-400  text-white font-semibold rounded px-4 py-2 border w-full text-lg placeholder:text-base '>Home</Link>
            </div>


        </div>
    )
}

export default CaptainEnd