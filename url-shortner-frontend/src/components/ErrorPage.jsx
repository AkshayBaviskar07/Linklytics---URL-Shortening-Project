import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'

const ErrorPage = ({message}) => {

  const navigateToHome = useNavigate();
  const location = useLocation();
  const displayMessage = location.state?.message || message || 'An unexpected error has occurred. Please try again later.';
  if (displayMessage !== "Page Not Found") {
    console.error("ErrorPage:", displayMessage);
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gray-100'>
      <FaExclamationTriangle className='text-6xl text-red-500 mb-4' />
      <h1 className='text-4xl font-bold mb-2 tets-gray-800'>
        Oops! Something went wrong.
      </h1>
      <p className='text-lg text-gray-600 mb-6 text-center px-4'>
        {displayMessage}
      </p>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer'
        onClick={() => {navigateToHome("/")}}
      >
        Go back to home
      </button>
    </div>
  )
}

export default ErrorPage