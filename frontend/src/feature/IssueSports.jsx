import React, { useState } from 'react'
import { useAuth } from '../auth/AuthProvider'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {MoveLeft} from 'lucide-react'

const IssueSports = () => {
    const { id } = useParams();
    const { profile } = useAuth();
    const [textarea, settextarea] = useState("");
    const token = JSON.parse(localStorage.getItem("token"));
    const navigator=useNavigate();

    const handlepage=()=>{
        navigator(`/details/${id}`)
    }
    const handleIssue = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `https://sports-system-9e99.onrender.com/api/sport/issuesportsitem/${id}`,
                { textarea },
                {
                    withCredentials: true,
                    headers: { authorization: `Bearer ${token}` }
                }
            );
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="bg-[url('/abigail-keenan-8-s5QuUBtyM-unsplash.jpg')] bg-cover bg-center min-h-screen ">
            <MoveLeft size={136} strokeWidth={1.75} className="relative -top-6" onClick={handlepage}/>
            <div className="bg-cover bg-center flex flex-col items-center justify-center p-6">
            {profile?.photo?.url && (
                <img 
                    src={profile.photo.url} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full mb-6 border-2 border-white shadow-sm" 
                />
            )}  
            <div className="text-lg font-medium text-white mb-4 text-center">{profile?.studname}</div>
            <form onSubmit={handleIssue} className="w-full max-w-lg flex flex-col items-center gap-4">
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
                    className="bg-blue-500 text-white py-2 px-8 rounded-full hover:bg-blue-600 transition-colors font-semibold"
                >
                    Issue
                </button>
            </form>
        </div>
        </div>
    )
}

export default IssueSports;