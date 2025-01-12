import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
        <div className='bg-cover bg-bottom bg-[url(https://images.unsplash.com/photo-1510411210400-3199921e797d?q=80&w=1677&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen  pt-8  flex flex-col w-full bg-red-400 justify-between'>
            <img className='w-14 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"  alt="uber-logo"></img>
            <div className='bg-white pb-7 py-5 px-5'>
                <h2 className='text-2xl font-bold'>Get Started with Uber </h2>
                <Link to="/login" className='flex items-center text-lg justify-center w-full rounded mt-4 bg-black text-white py-3'>Continue</Link>
            </div>
        </div>

    </div>
  )
}

export default Start