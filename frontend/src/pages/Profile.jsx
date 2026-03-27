import React from 'react'
import { useAuth } from '../auth/AuthProvider.jsx'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { profile,setprofile,setisauthenticate,loading,isauthentcate} = useAuth();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"))

  const handlehome = () => navigate("/")

  const handlelogout = async () => { 
    try{
      await axios.get("https://sports-system-9e99.onrender.com/api/stud/logout",{
        withCredentials:true,
        headers:{ authorization:`Bearer ${token}` }
      })
      localStorage.removeItem("token")
      setprofile(null)
      setisauthenticate(false)
      navigate("/login")
    }catch(error){
      console.log(error.message);
    }
  }

  return (
    <div className="bg-[url('/abigail-keenan-8-s5QuUBtyM-unsplash.jpg')] bg-cover bg-center h-screen p-6 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 w-[320px] text-center text-white shadow-xl">

        <img src={profile?.photo?.url} alt="" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-white"/>

        <h2 className="text-xl font-semibold">{profile?.studname}</h2>
        <p className="text-sm text-gray-200">{profile?.email}</p>

        <div className="mt-4 text-sm space-y-1">
          <p>{profile?.role}</p>
          <p>{profile?.studid}</p>
        </div>

        <div className="mt-6 flex gap-3 justify-center">
          <button onClick={handlehome} className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition">Home</button>
          <button onClick={handlelogout} className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition">Logout</button>
          {!loading && isauthentcate && profile?.role==="admin"&&
            <Link to="/dashboard" className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition text-white">
              Dashboard
            </Link>
         }
        </div>

      </div>
    </div>
  )
}

export default Profile