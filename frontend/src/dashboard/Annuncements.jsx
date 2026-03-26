import axios from "axios"
import { useEffect, useState } from "react"
import {Link } from "react-router-dom"
const Announcement = () => {
  const token=JSON.parse(localStorage.getItem("token"));
  const [ann,setann]=useState([]);
  useEffect(()=>{
    const mycreatedsports=async()=>{
      try{
        const {data}=await axios.get("http://localhost:3455/api/note/myannucement",{
          withCredentials:true,
          headers:{
            authorization:`Bearer ${token}`
          }
        })
        console.log(data.message)
        setann(data.message)
      }
      catch(error){
        console.log(error.message);
      }
    }
    mycreatedsports();
  },[])
return (
  <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
    
    {ann.length === 0 ? (
      <p>No announcements</p>
    ) : (
      ann.map((item) => (
        <Link to={`/annucment/${item._id}`} key={item._id}>
          
          <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition">

            <h2 className="font-semibold text-gray-800">
              {item.title}
            </h2>

            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
              {item.text}
            </p>

          </div>

        </Link>
      ))
    )}

  </div>
)
}

export default Announcement