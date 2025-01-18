import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import { useEffect, useContext } from 'react'
import LiveTracking from './LiveTracking'
const Riding = () => {
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()
    const rideData = useLocation().state?.ride
    socket.on("ride-ended", (ride) => {
        console.log(ride)
        navigate("/user-end", { state: { ride: ride } })
    })
    return (
        <div className='h-screen overflow-y-hidden'>
            <Link to="/home" className='fixed  right-2 top-2 h-10 rounded-full w-10 flex items-center justify-center bg-white'>
                <i className="text-xl font-medium ri-home-4-line"></i>
            </Link>
            <div className="h-[55%] w-full  z-10  relative">
                <LiveTracking />
            </div>
            <div className='h-[45%] p-4 bg-slate-300'>
                <div className='flex mt-2 items-center justify-between'>
                    <img className=' h-16 w-22  ' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="car" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium'>{rideData?.user.fullname.firstname} {rideData?.user.fullname.lastname}</h2>
                        <h4 className='text-xl font-semibold'>{rideData?.otp}</h4>
                        <p className='text-sm text-gray-600'>Maruti Suzuki Swift</p>
                    </div>
                </div>

                <div className='gap-5 flex flex-col justify-between items-center'>

                    <div className='w-full'>
                        <div className='flex items-center gap-5 my-1 border-b-2 pb-1'>


                        </div>

                        <div className='flex items-center gap-5 my-1 border-b-2 pb-1'>
                            <i className=" text-lg ri-map-pin-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'>562/11 A </h3>
                                <p className=' text-gray-600 text-sm '>{rideData?.destination}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 my-1  pb-1'>
                            <i className=" text-lg ri-money-rupee-circle-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'>₹{rideData?.fare} </h3>
                                <p className=' text-gray-600 text-sm '>Cash</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button  onClick={() => {
                    setVehicleFound(true)
                    setConfirmVehiclePanel(false)
                }}
                 className=" bg-slate-800 w-full  h-[45px] my-5 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
                    Make a Payment
                </button>
               
            </div>
        </div>
    )
}

export default Riding