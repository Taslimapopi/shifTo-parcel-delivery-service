import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from '../components/Loading';


const AdminRoute = ({children}) => {
    const {user, loading} = useAuth()
    const {role, roleLoading} = useRole()
    console.log(role)
    if(loading || roleLoading){
        return <Loading></Loading>
    }

    if(!user){
        return <p>please log in as admin</p>
    }

    if (role!== 'admin'){
        return <p>access forbidden</p>
    }
    return children
};

export default AdminRoute;

