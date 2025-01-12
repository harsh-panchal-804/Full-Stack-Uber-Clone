import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        axios
            .get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    localStorage.removeItem('token'); // Clear token
                    navigate('/login'); 
                }
            })
            .catch((error) => {
                console.error('Logout failed:', error);
                localStorage.removeItem('token'); // Clear token even if API fails
                navigate('/login'); 
            });
    }, [navigate]);
    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
};

export default UserLogout; 
