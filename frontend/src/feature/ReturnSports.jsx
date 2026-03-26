import React, { useState } from 'react'
import { useAuth } from '../auth/AuthProvider'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ReturnSports = () => {
    const { id } = useParams();
    const { profile } = useAuth();
    const [textarea, settextarea] = useState("");
    const token = JSON.parse(localStorage.getItem("token"));

    const handleReturn = async (e) => {
        e.preventDefault();
        if (!textarea.trim()) return;
        try {
            const { data } = await axios.post(
                `http://localhost:3455/api/sport/returnsportsitem/${id}`,
                { textarea },
                {
                    withCredentials: true,
                    headers: { authorization: `Bearer ${token}` }
                }
            );
            console.log(data);
            settextarea("");
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="bg-[url('/abigail-keenan-8-s5QuUBtyM-unsplash.jpg')] bg-cover bg-center min-h-screen flex flex-col items-center justify-center p-6">
            
            {profile?.photo?.url && (
                <img 
                    src={profile.photo.url} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full mb-4 border-2 border-white shadow-sm" 
                />
            )}  

            <div className="text-lg font-medium text-white mb-6 text-center">{profile?.studname}</div>

            <form onSubmit={handleReturn} className="w-full max-w-lg flex flex-col items-center gap-4">
                <h2 className="text-white text-center text-lg font-semibold mb-2">
                    Enter Student Name One by One
                </h2>

                <textarea
                    placeholder='Enter name of Students...'
                    minLength={5}
                    maxLength={70}
                    value={textarea}
                    onChange={(e) => settextarea(e.target.value)}
                    className="w-full p-3 rounded-md border border-white bg-white/70 placeholder-gray-600 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none h-28 text-center"
                ></textarea>

                <button
                    type='submit'
                    className="bg-green-500 text-white py-2 px-8 rounded-full hover:bg-green-600 transition-colors font-semibold"
                >
                    Return
                </button>
            </form>
        </div>
    )
}

export default ReturnSports;