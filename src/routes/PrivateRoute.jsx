import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading';
import { Navigate, useLocation, useNavigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    
    if(!user){
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }

    if (loading) return <Loading></Loading>
    return children
};

export default PrivateRoute;