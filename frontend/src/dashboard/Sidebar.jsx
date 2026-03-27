import React from 'react'
import { useAuth } from '../auth/AuthProvider'
import {useNavigate} from "react-router-dom"
import axios from 'axios';

const Sidebar = ({ component, setcomponent }) => {
  const { profile,setprofile,setisauthenticate } = useAuth();
  const navigate=useNavigate();
  const token=JSON.parse(localStorage.getItem("token"))
  const handlecomponent = (value) => {
    setcomponent(value)
  }

  const handlelogout=async()=>{
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

  const gotohome=()=>{
    navigate('/')
  }
  return (
    <div className="flex flex-col p-4 gap-4 bg-white/20 rounded-lg w-48">
      {profile?.photo?.url && (
        <img src={profile.photo.url} alt="Profile" className="w-20 h-20 rounded-full mx-auto" />
      )}
      <h1 className="text-center font-semibold text-white">{profile?.studname}</h1>
      <button
        onClick={() => handlecomponent("my created sports")}
        className={`w-full py-2 rounded ${component === "my created sports" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        Sports
      </button>
      <button
        onClick={() => handlecomponent("create sports")}
        className={`w-full py-2 rounded ${component === "create sports" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        Create Sports
      </button>
      <button
        onClick={() => handlecomponent("announcement")}
        className={`w-full py-2 rounded ${component === "announcement" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        Announcements
      </button>
      <button
        onClick={() => handlecomponent("create announcement")}
        className={`w-full py-2 rounded ${component === "create announcement" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        Create Announcements
      </button>
      <button
        onClick={() => handlecomponent("itemissuedashboard")}
        className={`w-full py-2 rounded ${component === "itemissuedashboard" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        Sports Issue to
      </button>
      <button
        onClick={() => handlecomponent("contact forms")}
        className={`w-full py-2 rounded ${component === "contact forms" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        Contact Forms
      </button>
      <button onClick={gotohome}
        className={`w-full py-2 rounded bg-green-700`}
      >
        Home
      </button>
      <button onClick={handlelogout} className={`w-full py-2 rounded bg-red-700`} >Logout</button>

    </div>
  )
}

export default Sidebar