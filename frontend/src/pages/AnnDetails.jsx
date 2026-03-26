import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const AnnDetails = () => {
  const { id } = useParams();
  const [ann, setann] = useState(null);
  const token = JSON.parse(localStorage.getItem("token")) || "";

  useEffect(() => {
    if (!id) return;
    const fetchann = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3455/api/note/getsinglenotification/${id}`,
          {
            withCredentials: true,
            headers: { authorization: `Bearer ${token}` }
          }
        );
        setann(data.notefication);

      } catch (error) {
        console.log(error);
      }
    };

    fetchann();
  }, [id]);

  if (!ann) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">

      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-xl w-full">
        <h1 className="text-2xl font-bold text-gray-800">
          {ann.title}
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          {new Date(ann.createdAt).toLocaleString()}
        </p>

        <p className="text-gray-600 mt-4 leading-relaxed">
          {ann.text}
        </p>

        <a
          href={ann.link}
          className="mt-4 inline-block text-blue-600 hover:underline text-sm"
        >
          Visit Link →
        </a>

      </div>

    </div>
  );
};

export default AnnDetails;