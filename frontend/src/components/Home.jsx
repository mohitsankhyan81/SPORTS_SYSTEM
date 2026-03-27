import React, { useEffect } from 'react'
import { useAuth } from '../auth/AuthProvider'
import { useNavigate } from 'react-router-dom';
import SportsGames from '../home/SportsGames';
import Achievements from '../home/Achivements';

const Home = () => {
  const {isauthentcate,loading}=useAuth();
  const navigator=useNavigate();
  const token=JSON.parse(localStorage.getItem("token"));
  if(!token){
    navigator("/login")
  }
  useEffect(()=>{
    if(!loading&&!isauthentcate){
      navigator("/login");
    }
  },[isauthentcate,navigator])
  return (
    <div>
      <SportsGames/>
      <Achievements/>
    </div>
  )
}

export default Home
