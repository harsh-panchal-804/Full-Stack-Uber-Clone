import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from "../context/UserContext"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AlertComp from '../components/AlertComp'
import { useGSAP } from "@gsap/react"
import { HiMail, HiKey } from "react-icons/hi";
import gsap from 'gsap'
import { Label, TextInput } from 'flowbite-react'
import LoginButton from '../components/LoginButton'

const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({})
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserDataContext)
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState(null);
    const alertRef = useRef(null);
    
    useGSAP(function () {
        if (showAlert) {
            gsap.to(alertRef.current, {
                opacity: 1,
                duration: 1,
            });
        } else {
            gsap.to(alertRef.current, {
                opacity: 0,
                duration: 1,
            });
        }
    }, [showAlert]);

    const validateForm = () => {
        if (!email || !password) {
            setError('Please fill in all fields');
            return false;
        }
        if (password.length < 6) {
            setError('Password must have a length of 6');
            return false;
        }
        return true;
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        if (!validateForm()) return;
        const newUser = {
            email,
            password
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, newUser)
            if (response.status === 200) {
                const data = response.data
                setUser(data.user)
                localStorage.setItem('token', data.token)
                navigate('/home')
            }
        }
        catch (err) {
            setShowAlert(true)
            setError(err.message)
            setTimeout(() => {
                setShowAlert(false)
            }, 2000)
        }
        setEmail('')
        setPassword('')
    }

    return (
        <div className='p-7 flex flex-col justify-between h-screen'>
            <div>
                <div className='opacity-0 w-full absolute top-0 right-0' ref={alertRef}>
                    <AlertComp 
                        message1="Oops!"
                        message2="Invalid credentials"
                     />
                </div>

                <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="uber-logo" />
                <form onSubmit={(e) => submitHandler(e)}>
                    <div className="min-w-md my-2">
                        <div className="mb-2 block ">
                            <Label htmlFor="email" className='text-lg' value="Your email" />
                        </div>
                        <TextInput 
                            sizing='sm' 
                            className='w-50 ' 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            id="email" 
                            type="email" 
                            rightIcon={HiMail} 
                            placeholder="passengerharsh@gmail.com"
                            required 
                        />
                    </div>

                    <div className="min-w-md my-2">
                        <div className="mb-2 block">
                            <Label htmlFor="password" className='text-md' value="Your password" />
                        </div>
                        <TextInput 
                            sizing='sm' 
                            className='w-50 ' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            id="password" 
                            type="password" 
                            rightIcon={HiKey} 
                            placeholder="123456" 
                            required
                            color={password.length < 6 && password !== '' ? "failure" : "default"}
                            helperText={password.length < 6 && password !== '' ? 
                                <><span className="font-medium">Oops!</span> Password must have a length of 6!</> : null
                            }
                        />
                    </div>
                    <div className='flex items-center w-70 h-full justify-center my-4'>
                        <LoginButton submitHandler={submitHandler} />
                    </div>

                    <p className='text-center text-base pb-2'>
                        New here? <Link to="/signup" className="text-blue-600 ">Create New Account </Link>
                    </p>
                </form>
            </div>
            <div>
                <Link 
                    to="/captain-login" 
                    className=" mb-7 flex items-center justify-center text-white font-semibold rounded-full px-4 py-2 border w-full text-lg placeholder:text-base gap-3 cursor-pointer bg-gradient-to-r from-gray-800 to-black border-gray-600 hover:scale-105 duration-200 hover:text-gray-500 hover:border-gray-800 hover:from-black hover:to-gray-900"
                >
                    Sign in as Captain
                </Link>
            </div>
        </div>
    )
}

export default UserLogin
