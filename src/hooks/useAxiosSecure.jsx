import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';


const axiosInstance = axios.create({
    baseURL:'http://localhost:3000'
})

const useAxiosSecure = () => {
    const {user,loading,logOut} = useAuth()
    const navigate = useNavigate()
    
    
    useEffect(()=>{
        if (!user || loading) return;
        // interceptor req
        
        const reqInterceptor = axiosInstance.interceptors.request.use(config=>{ 
            config.headers.Authorization =`Bearer ${user?.accessToken}`
            return config
        })
// interceptor response

        const resInterceptor = axiosInstance.interceptors.response.use((response)=>{
            return response
        },
        (error)=>{
            console.log(error)
            const statusCode = error.status

            if(statusCode === 401 || statusCode === 403){
                logOut()
                .then(()=>{
                    navigate('/login')})
                


            }

            return Promise.reject(error);

        }
    
    )

        return ()=>{
            axiosInstance.interceptors.request.eject(reqInterceptor)
            axiosInstance.interceptors.response.eject(resInterceptor);
        }

    },[user,loading])
    return axiosInstance
};

export default useAxiosSecure;
