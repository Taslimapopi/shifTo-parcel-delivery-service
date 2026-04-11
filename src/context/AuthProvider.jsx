import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut,  updateProfile } from 'firebase/auth';

const AuthProvider = ({children}) => {
    const [user,setUser ]= useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()

    const registerUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email, password)
    }

    const updateUser = (profile)=>{
        return updateProfile(auth.currentUser,profile)
    }

    const logOut = ()=>{
        return signOut(auth)
    }
    // observe user state

    useEffect(()=>{
        const unSubsCribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
            setLoading(false)

        })
        return ()=>{
            unSubsCribe()
        }
    },[])

    const googleSignIn  = () =>{
        return signInWithPopup(auth, googleProvider)
    }

    const authInfo = {
        registerUser,
        signInUser,
        updateUser,
        user,
        loading,
        logOut,
        googleSignIn 

        
    }



    return <AuthContext value={authInfo}>{children}</AuthContext>
};

export default AuthProvider;