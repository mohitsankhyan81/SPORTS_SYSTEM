import React from 'react'
import { Link } from "react-router-dom"
import { useAuth } from '../auth/AuthProvider.jsx'

const Footer = () => {
  const { profile } = useAuth();

  return (
    <div className='bg-slate-700 text-white px-6 py-5'>

      <div className='flex justify-between items-start'>

        <div className='max-w-xs'>
          <div className='bg-amber-500 w-24 text-center rounded-full py-1 font-semibold mb-2'>
            <Link to={"/"}>
              Sports
            </Link>
          </div>
          <p className='text-sm'>
            This platform helps players and organizers manage sports events easily.
          </p>
        </div>
        <div className="text-sm space-y-1">
          <p className="font-semibold mb-1">Contact</p>

          <Link to="/contact" className="hover:underline block">
            Contact Form
          </Link>

          <a
            href="https://github.com/mohitsankhyan81"
            className="hover:underline block text-blue-400"
          >
            GitHub
          </a>
        </div>

        <div className='text-sm'>
          <p className='font-semibold mb-1'>Tech</p>
          <p>React</p>
          <p>Tailwind</p>
          <p>Node</p>
          <p>Express</p>
        </div>

        {profile && (
          <div className='h-10 w-10'>
            <img 
              src={profile.photo.url} 
              alt="" 
              className='h-full w-full rounded-full object-cover border-2 border-white'
            />
          </div>
        )}

      </div>

    </div>
  )
}

export default Footer