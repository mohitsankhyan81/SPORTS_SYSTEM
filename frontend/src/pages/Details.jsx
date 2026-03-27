import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider';

const Details = () => {
  const { id } = useParams();
  const [sports, setsports] = useState(null);
  const navigate=useNavigate();
  const token = JSON.parse(localStorage.getItem("token")) || "";
  const {profile}=useAuth();
  useEffect(() => {
    if (!id) return;

    const fetchsports = async () => {
      try {
        const { data } = await axios.get(
          `https://sports-system-9e99.onrender.com/api/sport/getsinglesports/${id}`,
          {
            withCredentials: true,
            headers: { authorization: `Bearer ${token}` }
          }
        );
        setsports(data.sports);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchsports();
  }, [id]);

  if (!sports) {
    return <div className="text-center mt-10">Loading...</div>;
  }
  const handledelete=async(id)=>{
    try{
      const {data}=await axios.delete(`https://sports-system-9e99.onrender.com/api/sport/deleteSports/${id}`,{
        withCredentials:true,
        headers:{
        authorization:`Bearer ${token}`
        }
      })
      console.log(data)
      navigate("/dashboard")
      setsports(null)
    }
    catch(error){
      console.log(error.message)
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white max-w-3xl w-full rounded-xl shadow-md overflow-hidden">

        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
          <img
            src={sports?.photo?.url}
            alt=""
            className="max-h-full object-contain"
          />
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {sports?.title}
          </h1>

          <p className="text-gray-600 mt-4 leading-relaxed">
            {sports?.game}
          </p>

        <div className="mt-6 flex flex-wrap gap-3 justify-between items-center">

          <span className="text-blue-600 font-medium">
            Available: {sports?.totalcount}
          </span>

          <span className="text-sm text-gray-400">
            ID: {sports?._id?.slice(0, 6)}...
          </span>
          {profile.role !== "admin" && (
            <div className="flex gap-3">
              <Link
                to={`/issueSports/${sports._id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 hover:scale-105 transition duration-200"
              >
                Issue
              </Link>

              <Link
                to={`/returnSport/${sports._id}`}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 hover:scale-105 transition duration-200"
              >
                Return
              </Link>
            </div>
          )}
          {profile.role === "admin" && (
            <div className="flex gap-3">
              <Link
                to={`/sports/update/${sports?._id}`}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 hover:scale-105 transition duration-200"
              >
                Update
              </Link>

              <button
                onClick={() => handledelete(sports?._id)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-black hover:scale-105 transition duration-200"
              >
                Delete
              </button>
            </div>
          )}
        </div>
        </div>

      </div>
    </div>
  );
};

export default Details;