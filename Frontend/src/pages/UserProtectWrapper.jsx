import React, { useContext, useEffect, useState } from 'react'

import { UserDataContext } from '../context/userContext'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'
const UserProtectWrapper = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const { user, setUser } = useContext(UserDataContext)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate("/login")
        }
        else {
            axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                headers: {
                    Authorization: `Bearer ${token} `
                }
            })
            .then((res) => {
                    if (res.status == 200) {
                        setUser(res.data.user)
                        setIsLoading(false)
                    }
                }).catch((err) => {
                    localStorage.removeItem('token')
                    navigate("/login")
                })
        }

    }, [token])
    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <>
            {children}
        </>
    )

}

export default UserProtectWrapper