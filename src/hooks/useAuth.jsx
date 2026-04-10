import React, { use } from 'react';
import AuthProvider from '../context/AuthProvider';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
    const authInfo = use(AuthContext)
    return authInfo
};

export default useAuth;