import React from 'react'

const WaitForDriver = ({setWaitingForDriver,ride}) => {
  return (
    <div>
    <div className='flex items-center'>
        <h5 onClick={() => setWaitingForDriver(false)} className=' m-3  w-full p-3 text absolute top-3 left-[80%] '><i className=" text-xl ri-close-line"> </i></h5>
    </div>
    <br></br>
    <hr></hr>
    <div className='flex mt-2 items-center justify-between'>
    <img className=' h-16 w-22  '  src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="car" />
    <div className='text-right'>
        <h2 className='text-lg font-medium capitalize'>{ride?.captain.fullname?.firstname} {ride?.captain.fullname?.lastname}</h2>
        <h4 className='text-xl font-semibold'>{ride?.captain.vehicle.plate}</h4>
        <p className='text-sm text-gray-600'>Maruti Suzuki Swift</p>
        <h1 className='text-xl font-semibold'>{ride?.otp}</h1>
    </div>
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
                    <h3 className='text-lg font-medium'>₹{ride?.fare} </h3>
                    <p className=' text-gray-600 text-sm '>Cash </p>
                </div>
            </div>
        </div>
    </div>
    <div className="w-full mt-4">
          <button
            
            className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
          >
            Send Message to Driver
          </button>
        </div>
    
</div>
  )
}

export default WaitForDriver