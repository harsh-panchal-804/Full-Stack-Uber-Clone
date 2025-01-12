import React from 'react'
import { Link } from 'react-router-dom'




 
const PageNotFound = () => {
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center bg-black'>
        <img src='https://cdn.dribbble.com/users/2991/screenshots/3370551/ub_4.gif' alt="404-page"  />
        <h1 className='text-white text-3xl font-light'>Error 404</h1>
        <h1 className='text-white text-3xl font-light'>Page Not Found</h1>
        <br></br>
        <br></br>
        <div>
            <Link  to="/home" className='bg-yellow-500 mb-7 flex items-center justify-center border-yellow-400  text-white font-semibold rounded px-4 py-2 border w-full text-lg placeholder:text-base '>Home</Link>
        </div>
        
        
    </div>
  )
}

export default PageNotFound