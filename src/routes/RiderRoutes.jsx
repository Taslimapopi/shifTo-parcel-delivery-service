import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from '../components/Loading';

const RiderRoutes = ({children}) => {
    const {user,loading} = useAuth()
    const {role,roleLoading} = useRole()

    if(!user) return  <p>please log in as rider</p>

    if(loading||roleLoading) return <Loading></Loading>

    if(role!=='rider') return <P>forbidden access</P>
    return children
};

export default RiderRoutes;