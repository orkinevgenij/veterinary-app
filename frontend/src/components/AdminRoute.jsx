import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
export const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo?.isAdmin ? <Outlet /> : <Navigate to='/' replace />;
};
