import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from "axios"
import Cookies from "js-cookie";


export const AuthContext=createContext();

const AuthProvider =({children}) => {
    const[blogs,setBlogs]=useState();
    const[profile,setProfile]=useState();
    const[isAuthenticated,setIsAuthenticated]=useState(false);


    useEffect(()=>{
        const fetchProfile=async()=>{
            try {
                const token=Cookies.get("token");
                const parsedToken =token ? JSON.parse(token):undefined;
                if(parsedToken){const{data}=await axios.get("http://localhost:4001/api/users/myProfile",
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                      }
                      
                )
                console.log(data)
                setProfile(data)
                setIsAuthenticated(true)}
                
            } catch (error) {
                console.log(error)
            }
        }


        const fetchBlogs=async()=>{
            try {
                const{data}=await axios.get("http://localhost:4001/api/blogs/all-blogs")
                console.log(data)
                setBlogs(data)
            } catch (error) {
                console.log(error)
            }
        }
       fetchBlogs();
       fetchProfile();
    },[])
  return (
    
      <AuthContext.Provider value={{blogs,profile,setProfile,isAuthenticated,setIsAuthenticated}}>{children}</AuthContext.Provider>
    
  )
}

export default AuthProvider;
export const useAuth=()=>useContext(AuthContext)
