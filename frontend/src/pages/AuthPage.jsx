import React, { useState } from 'react'
import SignupCard from '../components/SignUp.jsx'
import LoginCard from '../components/Login.jsx'
import authScreen from '../atoms/authAtom.js'
import {useRecoilValue} from 'recoil'
const AuthPage = () => {
    const authScreeen=useRecoilValue(authScreen)
    // const [value,setValue]=useState('login')
  return (
    <div>
      {authScreeen==='login'?<LoginCard/>:<SignupCard/>}  
    </div>
  )
}

export default AuthPage