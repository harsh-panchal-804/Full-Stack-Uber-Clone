import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const FinishRide = ({ setFinishRidePanel, rideData }) => {
  const navigate = useNavigate()
  console.log(rideData)
  async function endRide() {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
        rideId: rideData._id
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.status === 200) {
        navigate("/captain-end", { state: { ride: rideData } })
        setFinishRidePanel(false)
      }

    }
    catch (err) {
      console.log(err.message)
    }

  }
  return (
    <div className=''>
      <div className='flex items-center mb-7'>
        <h3 className=' absolute top-5  text-2xl font-semibold m-3'>Drop Off.</h3>
        <h5 onClick={() => setFinishRidePanel(false)} className=' m-3  w-full p-3 text absolute top-3 left-[80%] '><i className=" text-xl ri-close-line"> </i></h5>
      </div>
      <hr></hr>
      <hr></hr>
      <div className='flex py-2 px-2 bg-yellow-400 rounded-xl items-center justify-between my-2'>
        <div className='flex items-center gap-3 '>
          <img className='h-12 rounded-full object-cover w-12' src="https://wallpapers.com/images/hd/beautiful-woman-with-random-people-in-background-roumbpovzh5jzxj5.jpg" alt="" />
          <h2 className='text-xl font-medium'>{rideData?.user.fullname.firstname} {rideData?.user.fullname.lastname}</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 Kms</h5>
      </div>

      <div className='gap-5 flex flex-col justify-between items-center'>

        <div className='w-full'>
          <div className='flex items-center gap-5 my-1 border-b-2 pb-1'>
            <i className=" text-lg ri-map-pin-user-line"></i>
            <div>
              <h3 className='text-lg font-medium'>562/11 A </h3>
              <p className=' text-gray-600 text-sm '>{rideData?.pickup}</p>
            </div>
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
              <h3 className='text-lg font-medium'> ₹{rideData?.fare}</h3>
              <p className=' text-gray-600 text-sm '>Cash</p>
            </div>
          </div>
        </div>

        <div className='mt-6 flex flex-col w-full px-5 gap-2'>

          <button
            onClick={endRide}
            className="relative  inline-flex h-12 active:scale-95 transistion overflow-hidden rounded-lg py-[3px] px-[2px] focus:outline-none"
          >
            <span
              className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#f2e03a_0%,#ec2e2e_50%,#bd5fff_100%)]"
            >
            </span>
            <span
              className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg  bg-slate-950 px-7 text-lg font-extralight text-white backdrop-blur-3xl gap-2 undefined"
            >
              Finish Ride
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z"
                ></path>
              </svg>
            </span>
          </button>


        </div>

      </div>
    </div>
  )
}

export default FinishRide