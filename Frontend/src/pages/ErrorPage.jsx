import React from 'react'
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <>
      <div className="container flex flex-col justify-center items-center h-[100vh]">
        <h4 className='text-6xl font-bold mb-12'>404 Not Found</h4>
        <p className='text-gray-500 text-sm mb-8'>Your Visited Page is Not Found. You may back to home page.</p>
        <Link to={"/"}><button className='bg-yellow-500 rounded px-3 py-1'>Back To Home Page</button></Link>
      </div>
    </>
  )
}

export default ErrorPage
