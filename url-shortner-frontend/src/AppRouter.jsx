import { Route, BrowserRouter, Routes } from "react-router-dom";
import LandingPage from './components/LandingPage'
import AboutPage from './components/AboutPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import RegisterPage from './components/RegisterPage'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast'
import { DashBoard } from './components/Dashboard/DashBoard.jsx'
import ShortenUrlPage from './components/ShortenUrlPage.jsx';
import PrivateRoute from "./PrivateRoute.jsx";
import ErrorPage from "./components/ErrorPage.jsx";

const AppRouter = () => {
  return (
       <>
        <Navbar/>
        <Toaster/>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/about" element={<AboutPage/>}/>

          <Route path="/register" 
          element={<PrivateRoute publicPage={true}><RegisterPage/></PrivateRoute>}/>
          <Route path='/login' 
          element={<PrivateRoute publicPage={true}><Login/></PrivateRoute>}/>

          <Route path='/dashboard' element={<PrivateRoute publicPage={false}><DashBoard/></PrivateRoute>}/>

          <Route path='/*' element={<ErrorPage message="Page Not Found"/>}/>
          <Route path='/error' element={<ErrorPage message="ERROR"/>}/>
        </Routes>
        <Footer/>
      </>
  )
}

export default AppRouter;

export const SubDomainRouter = () => {
  return (
    <Routes>
      <Route path="/:url" element={<ShortenUrlPage/>}/>
    </Routes>
  )
}