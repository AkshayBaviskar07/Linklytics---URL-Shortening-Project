import React from 'react'

const ErrorPage = ({message}) => {
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gray-100'>
      <h1 className='text-4xl font-bold '>
        <span className='text-gray-700'>Error: </span>
      </h1>
      <p className='text-lg text-red-500 mt-2'>{message}</p>
    </div>
  )
}

export default ErrorPage