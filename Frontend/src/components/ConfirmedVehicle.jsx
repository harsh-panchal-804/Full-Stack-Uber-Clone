import React from 'react'

const ConfirmedVehicle = ({ setConfirmVehiclePanel, setVehicleFound, createRide, vehicleType, pickupLocation, destinationLocation, fare }) => {
    return (
        <div>
            <div className='flex items-center'>
                <h3 className=' absolute top-5  text-2xl font-semibold m-3'>Confirm you ride</h3>
                <h5 onClick={() => setConfirmVehiclePanel(false)} className=' m-3  w-full p-3 text absolute top-3 left-[80%] '><i className=" text-xl ri-close-line"> </i></h5>
            </div>

            <div className='gap-5 flex flex-col justify-between items-center'>
                <img className='ml-14' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="car" />
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
                            <p className=' text-gray-600 text-sm '>{ }  {destinationLocation}</p>
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
                <button  onClick={() => {
                    setVehicleFound(true)
                    createRide(vehicleType)
                    setConfirmVehiclePanel(false)
                }}className="w-full bg-slate-900 h-[45px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
                   Confirm
                </button>
               

            </div>
        </div>
    )
}

export default ConfirmedVehicle