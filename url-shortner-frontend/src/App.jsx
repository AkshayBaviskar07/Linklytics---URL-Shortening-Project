import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import AboutPage from './components/AboutPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import RegisterPage from './components/RegisterPage'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast'
import { DashBoard } from './Dashboard/DashBoard.jsx'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Toaster/>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/dashboard' element={<DashBoard/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App