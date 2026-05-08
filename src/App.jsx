import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import LoginPage from './components/Login/LoginPage'

import './index.css';





export default function App({toggleMode, mode}){
 
  return (
    <>
    
       <Routes>
{/* =========NO-Token =========*/}

     <Route path="/" element={<LoginPage />} />

 <Route path="/login" element={<LoginPage />} />
{/* =========NO-Token =========*/}


{/* =========requiredToken =========*/}


       
     
</Routes> 

    </>
  )
}