import React from 'react'
"use client";

import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
const AlertComp = ({message1,message2}) => {
  return (
    <Alert color="failure" icon={HiInformationCircle}>
      <span className="font-medium">{message1}!</span> {message2}.
    </Alert>
  )
}

export default AlertComp