import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Verifyemail = () => {
  const {token}=useParams();
  const navigate=useNavigate();
  const [status,setstatus]=useState("Verification...");

  useEffect(()=>{
    const emailverify=async()=>{
    try{
      const res=await axios.get("http://localhost:3455/api/stud/verification",{
        headers:{
          authorization:`Bearer ${token}`
        }
      })
      console.log(res.data.success);
      if(res.data.success){
        setstatus("Email Verify Successfully...");

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
      else{
        setstatus("Invalid or expired token...");
      }
    }
    catch(error){
      console.log(error.message);
      setstatus("Something Went Wrong...");
    }
  }
  emailverify();
  },[token,navigate])
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

      <div>
        <div>{status}</div>
        <div>We will be redirect shortly</div>
      </div>
    </div>
  )
}

export default Verifyemail
