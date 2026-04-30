import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';


const axiosInstance = axios.create({
    baseURL:'http://localhost:3000'
})

const useAxiosSecure = () => {
    const {user,loading} = useAuth()
    
    console.log(user)
    useEffect(()=>{
        if (!user || loading) return;
        
        axiosInstance.interceptors.request.use(config=>{ 
            config.headers.Authorization =`Bearer ${user?.accessToken}`
            return config
        })
    },[user,loading])
    return axiosInstance
};

export default useAxiosSecure;
