import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext ,createContext} from 'react';
import axios from "axios"
export const authcontext=createContext();
const AuthProvider = ({children}) => {
    const [item,setitem]=useState([]);
    const [announcement,setannuncement]=useState([]);
    const [isauthentcate,setisauthenticate]=useState(false);
    const [profile,setprofile]=useState(null);
    const [loading,setloading]=useState(true)
    const token=JSON.parse(localStorage.getItem("token"))

    const fetchprofile=async()=>{
        try{
            const {data}=await axios.get("https://sports-system-9e99.onrender.com/api/stud/myprofile",{
                withCredentials:true,
                headers:{
                    authorization:`Bearer ${token}`
                }
            })
            console.log(data.user);
            setisauthenticate(true)
            setprofile(data.user);
        }
        catch(error){
            console.log(error.message);
            setisauthenticate(false)
        }
        finally{
            setloading(false)
        }
    }
    useEffect(()=>{
        const sportsitem=async()=>{
            try{
            const {data}=await axios.get(`https://sports-system-9e99.onrender.com/api/sport/getallsports`,{
                withCredentials:true,
                headers:{authorization:`Bearer ${token}`}
            })
            setitem(data)
            }
            catch(error){
                console.log("Error in the featching ",error);
            }
        }

        const announcements=async()=>{
            try{
                const {data}=await axios.get('https://sports-system-9e99.onrender.com/api/note/getallnotification',{
                    withCredentials:true,
                    headers:{
                        authorization:`Bearer ${token}`
                    }
                })
                console.log(data);
                setannuncement(data);
            }
            catch(error){
                console.log(error)
            }
        }
        fetchprofile();
        sportsitem();
        announcements();
    },[token])
  return (
    <authcontext.Provider value={{item,announcement,profile,isauthentcate,setisauthenticate,setprofile,loading}} >
        {children}
    </authcontext.Provider>
  )
}

export default AuthProvider


export const useAuth=()=>useContext(authcontext)