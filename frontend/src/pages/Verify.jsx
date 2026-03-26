import React from 'react'

const Verify = () => {
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
          
          <h1 className="text-xl font-bold mb-2">
            Verify Your Email
          </h1>

          <p className="text-gray-600 text-sm">
            Verification link has been sent to your email.
          </p>
          <a href='https://gmail.com' className="inline-block mt-4 bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition">Email</a>
        </div>
      </div>

    </div>
  )
}

export default Verify