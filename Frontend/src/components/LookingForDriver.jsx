import React, { useEffect } from 'react';

const LookingForDriver = ({setVehicleFound,setWaitingForDriver,pickupLocation,destinationLocation,vehicleType,fare}) => {

    return (
        <div>
            <div className='flex items-center'>
                <h5 onClick={() =>{
                    setVehicleFound(false)
                    setWaitingForDriver(true)
                }} className=' m-3  w-full p-3 text absolute top-3 left-[80%] '><i className=" text-xl ri-close-line"> </i></h5>
            </div>
            <div className='flex items-center'>
                <h3 className=' absolute top-5  text-2xl font-semibold m-3'>Looking for a driver... </h3>
            </div>
            <br></br>
            <hr></hr>
            <hr></hr>

            <div className='mt-3 gap-5 flex flex-col justify-between items-center'>
                <img className='h-90' src="https://cms.solaron.co.in/assets/images/yellow.gif" alt="car" />
                <div className='w-full'>
                    <div className='flex items-center gap-5 my-1 border-b-2 pb-1'>
                        <i className=" text-lg ri-map-pin-user-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11 A </h3>
                            <p className=' text-gray-600 text-sm '>{pickupLocation}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 my-1 border-b-2 pb-1'>
                        <i className=" text-lg ri-map-pin-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11 A </h3>
                            <p className=' text-gray-600 text-sm '>{destinationLocation}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 my-1  pb-1'>
                        <i className=" text-lg ri-money-rupee-circle-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{fare[vehicleType]} </h3>
                            <p className=' text-gray-600 text-sm '>Cash</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LookingForDriver