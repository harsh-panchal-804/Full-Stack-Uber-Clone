import React, { useContext, useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios'
import  { UserDataContext } from '../context/UserContext'
const UserSignup = () => {
    const [email, setEmail] =useState('')
    const [password, setPassword] =useState('')
    const [firstName, setFirstName] =useState('')
    const [lastName, setLastName] =useState('')
    const [userData, setUserData] =useState({})
    
    const navigate = useNavigate()
    const {user, setUser} =useContext(UserDataContext)

    const submitHandler= async function (e){
        e.preventDefault()
        const newUser={
            email,
            password,
            fullname:{
                firstname :firstName,
                lastname:lastName
            }
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

        if(response.status===201){
            const data=response.data
            setUser(data.user)
            localStorage.setItem('token', data.token)
            navigate('/home')
        }
        setEmail('')
        setPassword('')
        setFirstName('')
        setLastName('')


        
    }
    return (
        <div>
            <div className='p-7  flex flex-col justify-between h-screen'>
                <div>
                    <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="uber-logo"></img>
                    <form onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        <h3 className='text-lg font-medium mb-2 '> What's your name</h3>
                        <div className='flex gap-4'>
                        <input value={firstName} onChange={(e) => {
                            setFirstName(e.target.value)
                        }}
            
                        className='bg-[#eeeeee] mb-7  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base ]' 
                        type='text' 
                        required placeholder='First Name'
                        />
                        <input
                        value={lastName} onChange={(e)=>{
                            setLastName(e.target.value)
                        }} 
                        className='bg-[#eeeeee] mb-7  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base ' 
                        type='text' required placeholder='Last Name' 
                        
                        />
                        </div>
                        <h3 className='text-lg font-medium mb-2 '>What's your email</h3>
                        <input
                            value={email} onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            className='bg-[#eeeeee] mb-7  rounded px-4 py-2 border w-full text-lg placeholder:text-base ' 
                            type='email' required placeholder='abc@gmail.com' 
                            
                            />
                        <h3 className='text-lg font-medium mb-2 '>Enter password</h3>
                        <input
                            value={password} 
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            className='bg-[#eeeeee] mb-7  rounded px-4 py-2 border w-full text-lg placeholder:text-base '
                             type='password' 
                             required placeholder='Password'
                            />
                        <button className='bg-[#111111] mb-3  text-white font-semibold rounded px-4 py-2 border w-full text-lg placeholder:text-base '>Create Account</button>
                        <p className='text-center text-base pb-2'>
                            Have an account? <Link to="/login" className="text-blue-600 ">Login here </Link>
                        </p>
                    </form>
                </div>
                <div className='text-sm text-center '>
                    <p>By continuing, you agree to <span className='underline '> Uber's Terms of Service</span> and <span className='underline text-sm'>Privacy Policy</span>.</p>
                </div>


            </div>




        </div>
    )
}

export default UserSignup