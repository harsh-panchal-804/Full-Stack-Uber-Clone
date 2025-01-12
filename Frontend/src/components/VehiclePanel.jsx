import React from 'react'

const VehiclePanel = ({setVehiclePanel,setConfirmVehiclePanel,fare,setVehicleType}) => {
  return (
    <div >
        <div className='flex items-center w-full justify-between'>
          
         <h3 className='text-2xl font-semibold px-3 '>Choose a vehicle</h3>
         <h5 onClick={()=>setVehiclePanel(false)} className='  p-3  '><i className=" text-xl ri-close-line"> </i></h5>
         </div>

        <div onClick={()=>{
            setConfirmVehiclePanel(true)
            setVehicleType('car')
          
        }}    className='flex border-2 my-1.5 bg-gray-200 pr-2 active:border-black rounded-2xl items-center justify-between'>
          <img className='h-14 ' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="car"/>
          <div className=' w-1/2'>
            <h4 className='font-medium text-sm'>UberGo <span> <i className="ri-user-line"></i></span> 4</h4>
            <h5 className='font-medium text-sm'>2 mins away </h5>
            <p className='font-medium text-xs font-gray-600'> Affordable, compact rides</p>
          </div>
            <h2 className='  text-lg font-semibold '>
              ₹{fare.car} 
            </h2>
        </div>
        <div onClick={()=>{
            setConfirmVehiclePanel(true)
            setVehicleType('auto')
            
        }}  className='flex border-2 my-1.5 bg-gray-200 pr-2 active:border-black rounded-2xl items-center justify-between'>
          <img className='h-12 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="auto"/>
          <div className=' w-1/2'>
            <h4 className='font-medium text-sm'>UberAuto <span> <i className="ri-user-line"></i></span> 4</h4>
            <h5 className='font-medium text-sm'>8 mins away </h5>
            <p className='font-medium text-xs font-gray-600'> Affordable, compact rides</p>
          </div>
            <h2 className='  text-lg font-semibold '>
              ₹{fare.auto}
            </h2>
        </div>
       <div onClick={()=>{
        setConfirmVehiclePanel(true)
        setVehicleType('motorcycle')
        
       }} className='flex border-2 my-1.5 pr-2 bg-gray-200 active:border-black rounded-2xl items-center justify-between'>
          <img className='h-12 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="bike"/>
          <div className=' w-1/2'>
            <h4 className='font-medium text-sm'>UberMoto <span> <i className="ri-user-line"></i></span> 2</h4>
            <h5 className='font-medium text-sm'>9 mins away </h5>
            <p className='font-medium text-xs font-gray-600'> Affordable,motorcycle rides</p>
          </div>
            <h2 className='  text-lg font-semibold '>
              ₹{fare.motorcycle}
            </h2>
      </div>
    


    </div>
  )
}

export default VehiclePanel