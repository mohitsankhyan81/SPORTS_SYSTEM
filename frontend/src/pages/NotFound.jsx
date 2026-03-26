import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="bg-[url('/abigail-keenan-8-s5QuUBtyM-unsplash.jpg')] bg-cover bg-center h-screen p-6">
      
      <div className='flex items-center gap-4 mb-6 text-white bg-black/50 p-4 rounded-lg'>
        <div className='bg-amber-600 h-12 w-24 rounded-full flex justify-center items-center font-semibold'>
          Sports
        </div>
        <p className="text-sm">
          This platform helps players, coaches,
          and organizers connect, register,
          and manage sports events easily.
        </p>
      </div>

      <div className="flex justify-center items-center mt-20">
        <div className="bg-white/90 p-6 rounded-lg shadow-md text-center max-w-sm">
          
          <h1 className="text-4xl font-bold text-amber-600">404</h1>

          <div className="text-lg font-semibold mt-2">
            Page Not Found
          </div>

          <p className="text-gray-600 text-sm mt-2">
            Start from home page{" "}
            <Link 
              to="/" 
              className="text-blue-500 font-medium hover:underline"
            >
              Home
            </Link>
          </p>

        </div>
      </div>

    </div>
  )
}

export default NotFound