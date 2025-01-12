import React from 'react'

const LoginButton = ({submitHandler}) => {
    return (
        <button 
            onClick={submitHandler}
            className="bg-gray-100 text-center w-full rounded-2xl h-12 relative text-black text-xl font-semibold group" // Increased width from w-48 to w-52
            type="button"
        >
            <div
                className="bg-black rounded-xl h-10 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[90%] z-10 duration-500" // Increased hover width from 184px to 188px
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024 1024"
                    height="25px"
                    width="25px"
                >
                    <path
                        d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                        fill="#eeeeee"
                    ></path>
                    <path
                        d="m786.752 512-265.408 265.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312L786.752 512z"
                        fill="#eeeeee"
                    ></path>
                </svg>
            </div>
            <p className="translate-x-2">Login</p>
        </button>
    )
}

export default LoginButton
