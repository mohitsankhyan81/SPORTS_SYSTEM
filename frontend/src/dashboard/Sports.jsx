import axios from "axios"
import { useEffect, useState } from "react"
import {Link } from "react-router-dom"
const Sports = () => {
  const token=JSON.parse(localStorage.getItem("token"));
  const [sports,setsports]=useState([]);
  useEffect(()=>{
    const mycreatedsports=async()=>{
      try{
        const {data}=await axios.get("https://sports-system-9e99.onrender.com/api/sport/mysports",{
          withCredentials:true,
          headers:{
            authorization:`Bearer ${token}`
          }
        })
        console.log(data.myblog)
        setsports(data.myblog)
      }
      catch(error){
        console.log(error.message);
      }
    }
    mycreatedsports();
  },[])
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
      {sports.map((sport) => (
        <Link to={`/details/${sport._id}`} key={sport._id}>
          
          <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
            <div className="overflow-hidden">
              <img
                src={sport?.photo?.url}
                alt={sport.title}
                className="h-44 w-full object-cover hover:scale-105 transition duration-300"
              />
            </div>
            <div className="p-4">

              <h2 className="text-lg font-semibold text-gray-800">
                {sport.title}
              </h2>

              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {sport.game}
              </p>
              <div className="flex justify-between items-center mt-4">
                
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                  Players: {sport.totalcount}
                </span>

                <span className="text-xs text-gray-400">
                  View →
                </span>

              </div>

            </div>

          </div>

        </Link>
      ))}
      
    </div>
  )
}

export default Sports