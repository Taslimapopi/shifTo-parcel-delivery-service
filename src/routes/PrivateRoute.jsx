import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // First check loading
    if (loading) {
        return <Loading />;
    }

    // Then check if user is logged in
    if (!user) {
        return <Navigate 
            to="/login" 
            state={{ from: location.pathname }} 
            replace 
        />;
    }

    return children;
};

export default PrivateRoute;