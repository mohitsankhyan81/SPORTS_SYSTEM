import React from 'react'
import { useState } from 'react'
import {Eye,EyeOff} from "lucide-react"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { useAuth } from '../auth/AuthProvider'
const Register = () => {
  const [studname,setstudname]=useState("");
  const [studid,setstudid]=useState("");
  const [email,setEmail]=useState("");
  const [password,setpassword]=useState("");
  const [role,setrole]=useState("")
  const [photo,setphoto]=useState("");
  const navigator=useNavigate();
  const {isauthentcate,setisauthenticate}=useAuth();
  console.log(isauthentcate)
  const [showpassword,setshowpassword]=useState(false)

  const handlesubmit=async(e)=>{
    e.preventDefault();
    if(!studname || !studid || !email ||!role ||!password || !photo){
      toast.error("Fill all required Fields")
    }
    try{
    const formdata=new FormData();
    formdata.append("studname",studname)
    formdata.append("studid",studid)
    formdata.append("email",email)
    formdata.append("password",password)
    formdata.append("role",role)
    formdata.append("photo",photo)
    const res=await axios.post("https://sports-system-9e99.onrender.com/api/stud/register",formdata,{
      withCredentials:true
    })
    console.log(res.data);
    navigator("/verify")
    setisauthenticate(true)
    toast.success("Register")
  }
catch (error) {
  console.log("FULL ERROR:", error);

  if (error.response) {
    console.log("STATUS:", error.response.status);   // 👉 404
    console.log("DATA:", error.response.data);       // 👉 backend ka message
    console.log("HEADERS:", error.response.headers);

  } else if (error.request) {
    console.log("REQUEST:", error.request); // request gayi but response nahi aaya
  } else {
    console.log("ERROR:", error.message);
  }
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

      <form className="bg-black text-white border-white max-w-sm mx-auto p-6 rounded-lg shadow-md space-y-4" onSubmit={handlesubmit}>
        
        <h1 className="text-xl font-bold text-center">Signup</h1>

        <div>
          <select className="w-full p-2 border text-white rounded-md outline-none focus:ring-2 focus:ring-blue-400" value={role} onChange={(e)=>setrole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
        </div>

        <div>
          <input type="text" placeholder='Enter Name' className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400" value={studname} onChange={(e)=>setstudname(e.target.value)}/>
        </div>

        <div>
          <input type="number" placeholder='Enter ID' className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400" value={studid} onChange={(e)=>setstudid(e.target.value)}/>
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

        <div>
          <input type="file" className="w-full text-sm" onChange={e=>setphoto(e.target.files[0])}/>
        </div>

        <div className="text-center text-sm text-gray-600">
          Already Signup?{" "}
          <Link 
            to={"/login"} 
            className="text-blue-500 font-medium hover:text-blue-700 hover:underline transition"
          >
            Login
          </Link>
        </div>

        <button type="submit" className="w-full bg-amber-600 text-white p-2 rounded-md hover:bg-amber-700 transition">
          Signup
        </button>

      </form>
    </div>
  )
}

export default Register