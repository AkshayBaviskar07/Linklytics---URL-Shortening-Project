import React from 'react'
import ShortenItem from './ShortenItem'

const shortenUrlList = ({ data }) => {
  return (
    <div className='my-6 space-y-4'>
      {data.map((url) => (
        <ShortenItem key={url.id} url={url} {...url}/> 
      ))}
    </div>
  )
}

export default shortenUrlList