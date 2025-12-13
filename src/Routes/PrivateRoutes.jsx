import React from 'react';
import useAuth from '../hooks/useAuth/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({children}) => {
    const { user,loading } = useAuth();
    const location =useLocation();
    if(loading){
        return <span className="loading loading-bars loading-5xl"></span>
    }

    if(!user){
        return <Navigate to='/auth/login' state={location.pathname}></Navigate>
    }
    return children;
};

export default PrivateRoutes;