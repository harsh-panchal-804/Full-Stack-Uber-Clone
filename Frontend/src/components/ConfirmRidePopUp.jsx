import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Otp from './Otp'


const ConfirmRidePopUp = ({ setConfirmRidePopUpPanel, setRidePopUpPanel,ride }) => {
    
    return (
        <div>
            <div className='flex items-center mb-7'>
                <h3 className=' absolute top-5  text-2xl font-semibold m-3'>Confirm this ride to start.</h3>
                <h5 onClick={() => setConfirmRidePopUpPanel(false)} className=' m-3  w-full p-3 text absolute top-3 left-[80%] '><i className=" text-xl ri-close-line"> </i></h5>
            </div>
            <hr></hr>
            <hr></hr>
            <div className='flex py-2 px-2 border-2 border-yellow-300 rounded-xl items-center justify-between my-2'>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 rounded-full object-cover w-12' src="https://wallpapers.com/images/hd/beautiful-woman-with-random-people-in-background-roumbpovzh5jzxj5.jpg" alt="" />
                    <h2 className='text-xl font-medium'>{ride?.user.fullname.firstname} {ride?.user.fullname.lastname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 Km Away</h5>
            </div>

            <div className='gap-5 flex flex-col justify-between items-center'>

                <div className='w-full'>
                    <div className='flex items-center gap-5 my-1 border-b-2 pb-1'>
                        <i className=" text-lg ri-map-pin-user-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11 A </h3>
                            <p className=' text-gray-600 text-sm '>{ride?.pickup}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 my-1 border-b-2 pb-1'>
                        <i className=" text-lg ri-map-pin-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11 A </h3>
                            <p className=' text-gray-600 text-sm '>{ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 my-1  pb-1'>
                        <i className=" text-lg ri-money-rupee-circle-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'> ₹{ride?.fare}</h3>
                            <p className=' text-gray-600 text-sm '>Cash</p>
                        </div>
                    </div>
                </div>
                
                <div className='mt-6  flex flex-col w-full px-5 gap-2'>
                    <Otp length={6} 
                    setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
                    setRidePopUpPanel={setRidePopUpPanel}
                    ride={ride}
                    />
                </div>

            </div>
        </div>
    )
}

export default ConfirmRidePopUp