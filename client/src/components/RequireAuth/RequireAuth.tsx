import React from 'react';
import { useAuth } from '../../hooks/use-auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTERS } from '../../router/AppRoutes';

export const RequireAuth = () => {
  const { email } = useAuth();
  console.log(email);

  const location = useLocation();

  return email ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTERS.LOGIN} state={{ from: location }} replace />
  );
};
