import {React,useContext} from 'react'
import {CaptainDataContext} from "../context/CaptainContext"
const CaptainDetails = () => {
  const {captain}=useContext(CaptainDataContext)

  return (

    <div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start gap-5'>
            <img className='h-10 w-10 rounded-full object-cover' src="https://live.staticflickr.com/5252/5403292396_0804de9bcf_b.jpg" alt="driver" />
            <h4 className='text-lg font-medium capitalize'>{captain.fullname.firstname} {captain.fullname.lastname}</h4>
          </div>
          <div>
            <h4 className='text-xl font-semibold'>₹900.24</h4>
            <p className='text-md font-medium text-gray-600'>Earned</p>
          </div>
        </div>
        <div className='flex p-5 mt-4 bg-gray-200 rounded-3xl justify-center gap-4 items-start' >
          <div className='text-center '>
            <i className="text-2xl font-light ri-time-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600 '>Hours Online</p>
          </div>
          <div className='text-center '>
            <i className="text-2xl font-light ri-speed-up-line"></i>
            <h5 className='text-lg font-medium'>56.8</h5>
            <p className='text-sm text-gray-600 '>Kilometres Travelled</p>
          </div>
          <div className='text-center '>
            <i className="text-2xl font-light ri-booklet-line"></i>
            <h5 className='text-lg font-medium'>6</h5>
            <p className='text-sm text-gray-600 '>Rides Completed</p>
          </div>
        </div>
    </div>
  )
}

export default CaptainDetails