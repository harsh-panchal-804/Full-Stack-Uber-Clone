import React from 'react'

const RidePopUp = ({ setRidePopUpPanel, setConfirmRidePopUpPanel, ride, confirmRide }) => {
    return (
        <div>
            <div className='flex items-center mb-7'>
                <h3 className=' absolute top-5  text-2xl font-semibold m-3'>New Ride Available!</h3>
                <h5 onClick={() => setRidePopUpPanel(false)} className=' m-3  w-full p-3 text absolute top-3 left-[80%] '><i className=" text-xl ri-close-line"> </i></h5>
            </div>
            <hr></hr>
            <hr></hr>
            <div className='flex py-2 px-2 bg-yellow-200 rounded-xl items-center justify-between my-2'>
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
                <div className='flex w-full gap-3'>
                    {/* <button  className='rounded-lg  hover:bg-green-500 text-white font-semibold p-2' >Accept</button> */}
                    <button
                    onClick={() => {
                        setRidePopUpPanel(false)
                        setConfirmRidePopUpPanel(true)
                        confirmRide()
                    }}
                        className="relative w-1/2  rounded-lg bg-green-600  py-2  font-semibold text-white transition-colors duration-300 ease-linear before:absolute before:right-1/2 before:top-1/2 before:-z-[1] before:h-3/4 before:w-2/3 before:origin-bottom-left before:-translate-y-1/2 before:translate-x-1/2 before:animate-ping before:rounded-full before:bg-green-400 hover:bg-green-700 hover:before:bg-green-700"
                    >
                        Accept
                    </button>
                    <button onClick={() => {
                        setRidePopUpPanel(false)
                    }}
                        className='w-1/2 rounded-lg bg-gray-400  text-gray-700 font-semibold p-2' >Ignore</button>
                </div>

            </div>
        </div>
    )
}

export default RidePopUp