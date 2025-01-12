import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function SubOTPBox({ reference, onDone, goBack }) {
    const [stateValue, setStateValue] = React.useState('');
    return (
        <div className='flex items-center justify-center'>
            <input
                maxLength={1}
                ref={reference}
                value={stateValue}
                type="text"
                className='h-12 w-10 bg-gray-100 rounded-md text-black border-gray-300 text-center focus:border-indigo-500 focus:ring-indigo-500'
                placeholder="0"
                onKeyUp={(e) => {
                    if (e.key === "Backspace") {
                        if (stateValue.length === 0) {
                            goBack();
                        } else {
                            setStateValue('');
                        }
                    }
                }}
                onChange={(e) => {
                    const value = e.target.value;
                    if (/^[0-9]$/.test(value)) {
                        setStateValue(value);
                        onDone(e);
                    }
                }}
            />
        </div>
    );
}

const Otp = ({ length, ride, setConfirmRidePopUpPanel, setRidePopUpPanel }) => {
    const ref = useRef(Array(length).fill(null));
    const [otp, setOtp] = useState('');
    const buttonRef = useRef(null);
    const navigate = useNavigate();

    // Function to handle the API call
    const submitHandler = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
                {
                    params: {
                        rideId: ride._id,
                        otp: otp,
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            if (response.status === 200) {
                setConfirmRidePopUpPanel(false);
                setRidePopUpPanel(false);
                navigate('/captain-riding', { state: { ride: ride } });
            }
        } catch (error) {
            console.error('Error starting the ride:', error);
        }
    };

    useEffect(() => {
        if (otp.length === length) {
            submitHandler(); // Call submitHandler when otp is fully updated
        }
    }, [otp]); // Dependency array ensures this runs whenever otp changes

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='flex gap-2 items-center justify-center'>
                {[...Array(length)].map((_, i) => (
                    <React.Fragment key={i}>
                        <SubOTPBox
                            reference={(e) => {
                                ref.current[i] = e;
                            }}
                            onDone={(e) => {
                                if (i + 1 >= length) {
                                    buttonRef.current.focus();
                                    return;
                                }
                                ref.current[i + 1].focus();
                            }}
                            goBack={() => {
                                if (i === 0) {
                                    return;
                                }
                                ref.current[i - 1].focus();
                            }}
                        />
                    </React.Fragment>
                ))}
            </div>
            <button
                ref={buttonRef}
                onClick={() => {
                    const final_otp = ref.current.map((e) => e.value).join('');
                    setOtp(final_otp); // Update otp state
                }}
                onKeyUp={(e) => {
                    if (e.key === "Backspace") {
                        ref.current[length - 1].focus();
                    }
                }}
                className="w-[180px] justify-center text-center mt-5 cursor-pointer inline-flex items-center rounded-3xl px-9 py-2 text-xl font-mono font-semibold text-slate-700 focus:text-slate-700 border-2 border-orange-500 focus:bg-green-400 transition ease-in-out delay-150 focus:translate-y-1 focus:scale-105 duration-300 "
            >
                Submit
            </button>
        </div>
    );
};

export default Otp;
