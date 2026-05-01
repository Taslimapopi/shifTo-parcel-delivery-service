import React from 'react';
import useAuth from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';

const SocialLogIn = ({ onClick, isLoading = false }) => {
    const {googleSignIn} = useAuth()
    const location  = useLocation();
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()


    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(res=>{
          console.log(res)
            navigate(location?.state || '/')
            const userInfo ={
             displayName: res.user.displayName ,
             email: res.user.email,
             photoURL: res.user.photoURL
            }

            axiosSecure.post('/users',userInfo)
            .then(res=>{
             
                
              
            })



        })
    }
    
  return (
    <button
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 dark:bg-base-200 dark:hover:bg-base-300 border border-gray-300 dark:border-base-500 text-gray-700 dark:text-white font-medium py-3.5 rounded-2xl transition-all disabled:opacity-70"
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
      ) : (
        <img 
          src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" 
          alt="Google" 
          className="w-5 h-5"
        />
      )}
      <span>Continue with Google</span>
    </button>
  );
};

export default SocialLogIn;