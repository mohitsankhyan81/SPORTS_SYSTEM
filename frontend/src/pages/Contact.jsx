import React from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const Contact = () => {

  const [name,setname]=useState("");
  const [email,setemail]=useState("");
  const [studid,setstudid]=useState("");
  const [message,setmessage]=useState("");
  const token=JSON.parse(localStorage.getItem("token"))
  console.log("data");
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const {data}=await axios.post(
        `http://localhost:3455/api/cont/contact-form`,
        {name,email,studid,message},
        {withCredentials:true,
          headers:{
            authorization:`Bearer ${token}`
          }
        }
      );
      console.log("data")
      console.log(data)
      toast.success(data.message || "Contact Sent");

      setname("");
      setemail("");
      setmessage("");

    }catch(error){
      console.log(error.response)
      console.log("error when posting data",error);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">

        <h1 className="text-2xl font-semibold text-center mb-5">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={e=>setname(e.target.value)}
            className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={e=>setemail(e.target.value)}
            className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="number"
            placeholder="Stud ID"
            value={studid}
            onChange={e=>setstudid(e.target.value)}
            className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            placeholder="Enter Message"
            value={message}
            onChange={e=>setmessage(e.target.value)}
            className="w-full border rounded-md p-2 h-28 resize-none outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Submit
          </button>

        </form>

        <div className="mt-6 text-center text-sm text-gray-600 space-y-1">
          <p>📞 +91 9852413541</p>
          <p>📧 mohitsankhyan81@gmail.com</p>
          <p>📍 Bilaspur (HP)</p>
        </div>

      </div>

    </div>
  );
};

export default Contact;