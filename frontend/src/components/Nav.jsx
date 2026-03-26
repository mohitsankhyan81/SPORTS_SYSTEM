import { Link } from 'react-router-dom'
import React from 'react'
import AuthProvider, { useAuth } from '../auth/AuthProvider.jsx'

const Nav = () => {
  const {profile}=useAuth();
  console.log(profile)
  return (
    <div className='bg-slate-700'>
      <div className='flex items-center justify-between px-6 py-3 text-white'>
        <div className='bg-amber-600 h-12 w-24 rounded-full flex justify-center items-center font-semibold'>
          <Link to={"/"}>
              Sports
          </Link>
        </div>
        <div className='flex gap-6'>
          <Link to="/announcement">News</Link>
          <Link to="/sportsitem">Games</Link>
        </div>
        <div>
        
          {profile ? (
            <div className='h-10 w-10'>
              <Link to={"/myprofile"}><img 
                src={profile.photo.url} 
                alt="" 
                className='h-full w-full rounded-full object-cover'
              />
              </Link>
            </div>
          ) : (
            <Link className='bg-white text-blue-600 px-3 py-1 rounded-full' to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Nav
