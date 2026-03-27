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
          `http://localhost:3455/api/sport/getsinglesports/${id}`,
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
      const {data}=await axios.delete(`http://localhost:3455/api/sport/deleteSports/${id}`,{
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

          <div className="mt-6 flex justify-between items-center">
            <span className="text-blue-600 font-medium">
              Avilable: {sports?.totalcount}
            </span>

            <span className="text-sm text-gray-400">
              ID: {sports?._id?.slice(0,6)}...
            </span>
          {profile.role!=="admin"&&(
            <>
          <Link to={`/issueSports/${sports._id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
            Issue Sports
          </Link>

          <Link to={`/returnSport/${sports._id}`}>Return Sports</Link>
          </>
          )}
            {profile.role === "admin" && (
            <>
              <Link to={`/sports/update/${sports?._id}`}>Update</Link>
              <button onClick={()=>handledelete(sports?._id)}>Delete</button>
            </>
          )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Details;