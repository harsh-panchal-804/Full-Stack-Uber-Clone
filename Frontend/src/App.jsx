import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'  
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'

import Start from './pages/Start'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'

import Riding from './components/Riding'
import PageNotFound from './pages/PageNotFound'
import CaptainRiding from './pages/CaptainRiding'
import CaptainEnd from './pages/CaptainEnd'
import UserEnd from './pages/UserEnd'
import {Toaster} from 'react-hot-toast'
const App = () => {

  return (
    <div >
      <Toaster/>
     <Routes>
      <Route path='/' element ={<Start/>} />
      <Route path='/login' element ={<UserLogin/>} />
      <Route path='/signup' element ={<UserSignup/>} />
      <Route path='/captain-login' element ={<CaptainLogin/>} />
      <Route path='/captain-signup' element ={<CaptainSignUp/>} />
      <Route path="/riding" element={<Riding/>} />
      <Route path="/*" element={<PageNotFound/>} />
      <Route path="/captain-end" element={<CaptainEnd/>} />
      <Route path="/user-end" element={<UserEnd />} />
      <Route path="/captain-riding"  element={<CaptainRiding/>}/>
      <Route path='/home' element ={
          <UserProtectWrapper>
            <Home/>
          </UserProtectWrapper>
      } />
      <Route path='/user/logout' element={
        <UserProtectWrapper>
          <UserLogout/>
        </UserProtectWrapper>
      } 
      />
      <Route  path="/captain-home" element={
        <CaptainProtectWrapper>
          <CaptainHome/>
        </CaptainProtectWrapper>
      }/>
     </Routes>
    </div>
  )
}

export default App