import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const RedirectIfLoggedIn = () => {
    const { isLoggedIn } = useSelector(state => state.auth);
    return isLoggedIn ? <Navigate to="/customer/welcome" replace /> : <Outlet />;
};

export default RedirectIfLoggedIn;