import React, { useContext } from 'react';
import AuthProvider from '../context/AuthProvider';

const useAuth = () => {
    const authInfo = useContext(AuthProvider)
    return authInfo
};

export default useAuth;