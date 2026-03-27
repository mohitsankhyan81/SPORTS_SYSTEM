import React, { useState } from 'react'
import {Eye,EyeOff} from "lucide-react"
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../auth/AuthProvider';
const Login = () => {

  const [email,setEmail]=useState("");
  const [password,setpassword]=useState("");
  const [role,setrole]=useState("");
  const [showpassword,setshowpassword]=useState(false);
  const {isauthentcate,setisauthenticate}=useAuth();
  console.log(isauthentcate)
  const navigate=useNavigate();
  const handlelogin=async(e)=>{
    e.preventDefault();
    if(!role || !email ||!password){
      toast.error("Fill all Fields");
      return;
    }
    try{
      const res=await axios.post("https://sports-system-9e99.onrender.com/api/stud/login",{role,email,password},{
        withCredentials:true,
      })
      const token=res.data.accesstoken;
      localStorage.setItem("token",JSON.stringify(token));
      console.log(res.data)
      toast.success("Login Successfully");
      setisauthenticate(true)
      navigate("/");
    }
    catch(error){
      console.log(error.message)
      toast.error("Login Fail")
    }
  }
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

      <form className="bg-white/90 max-w-sm mx-auto p-6 rounded-lg shadow-md space-y-4" onSubmit={handlelogin}>
        
        <h1 className="text-xl font-bold text-center">Login</h1>

        <div>
          <select className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400" value={role} onChange={(e)=>setrole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
        </div>
        <div>
          <input type="email" placeholder='Enter Email' className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>

        <div className="relative">
          <input 
            type={showpassword ? "text" : "password"} 
            placeholder='Enter Password' 
            className="w-full p-2 pr-10 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
            value={password} 
            onChange={(e)=>setpassword(e.target.value)}
          />

          <button 
            type="button" 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            onClick={()=>setshowpassword(!showpassword)}
          >
            {showpassword ? <Eye size={18}/> : <EyeOff size={18}/>}
          </button>
        </div>
        <div className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link 
            to={"/register"} 
            className="text-blue-500 font-medium hover:text-blue-700 hover:underline transition"
          >
            Register
          </Link>
        </div>

        <button type="submit" className="w-full bg-amber-600 text-white p-2 rounded-md hover:bg-amber-700 transition">
          Login
        </button>

      </form>
    </div>
  )
}

export default Login
