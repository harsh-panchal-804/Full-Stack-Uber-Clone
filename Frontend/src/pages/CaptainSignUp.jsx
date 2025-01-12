import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const CaptainSignUp = () => {
    const [email, setEmail] =useState('')
    const [password, setPassword] =useState('')
    const [firstName, setFirstName] =useState('')
    const [lastName, setLastName] =useState('')
    const [userData, setUserData] =useState({})
    const {captain,setCaptain}=useContext(CaptainDataContext)
    const [vehicleColor, setVehicleColor] = useState('')
    const [vehiclePlate, setVehiclePlate] = useState('')
    const [vehicleCapacity, setVehicleCapacity] = useState('')
    const [vehicleType, setVehicleType] = useState('')
    
    const navigate=useNavigate()
    const submitHandler = async (e) => {
        e.preventDefault()
        const captainData=({
            fullname:{
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password,
            vehicle:{
                vehicleType: vehicleType,
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity
            }
        })
        const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
        if(response.status===201){
            const data=response.data
            setCaptain(data.captain)
            localStorage.setItem('token',data.token)
            navigate('/captain-home')

        }
        setEmail('')
        setPassword('')
        setFirstName('')
        setLastName('')
        setVehicleColor('')
        setVehiclePlate('')
        setVehicleCapacity('')
        setVehicleType('')
        


    }
return (
    <div>
        <div className='p-7 flex flex-col justify-between h-screen'>
            <div>
                <img className='w-16 mb-10' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="uber-driver-logo"></img>
                <form onSubmit={(e) => {
                    submitHandler(e)
                }}>
                    <h3 className='text-lg font-medium mb-2'>What's your name</h3>
                    <div className='flex gap-4'>
                        <input value={firstName} onChange={(e) => {
                            setFirstName(e.target.value)
                        }}
                            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                            type='text'
                            required placeholder='First Name'
                        />
                        <input
                            value={lastName} onChange={(e) => {
                                setLastName(e.target.value)
                            }}
                            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                            type='text' required placeholder='Last Name'
                        />
                    </div>
                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input
                        value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        type='email' required placeholder='abc@gmail.com'
                    />
                    <h3 className='text-lg font-medium mb-2'>Enter password</h3>
                    <input
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        type='password'
                        required placeholder='Password'
                    />
                    <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
                    <div className='grid grid-cols-2 gap-4'>
                        <select
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                            required
                        >
                            <option value="" disabled>Select Vehicle Type</option>
                            <option value="car">Car</option>
                            <option value="auto">Auto</option>
                            <option value="motorcycle">Motorcycle</option>
                        </select>
                        <input
                            value={vehicleColor}
                            onChange={(e) => setVehicleColor(e.target.value)}
                            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                            type='text'
                            required
                            placeholder='Vehicle Color'
                        />
                        <input
                            value={vehicleCapacity}
                            onChange={(e) => setVehicleCapacity(e.target.value)}
                            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                            type='number'
                            required
                            placeholder='Vehicle Capacity'
                        />
                        <input
                            value={vehiclePlate}
                            onChange={(e) => setVehiclePlate(e.target.value)}
                            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                            type='text'
                            required
                            placeholder='Vehicle Plate'
                        />
                    </div>
                    <button className='bg-[#111111] mb-3 text-white font-semibold rounded px-4 py-2 border w-full text-lg placeholder:text-base'>Create Captain Account</button>
                    <p className='text-center text-base pb-2'>
                        Have an account? <Link to="/captain-login" className="text-blue-600">Login here</Link>
                    </p>
                </form>
            </div>
            <div className='text-sm text-center'>
                <p>By continuing, you agree to <span className='underline'>Uber's Terms of Service</span> and <span className='underline text-sm'>Privacy Policy</span>.</p>
            </div>
        </div>
    </div>
)
}

export default CaptainSignUp