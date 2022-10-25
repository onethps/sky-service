import React from 'react';
import { useAuth } from '../../hooks/use-auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTERS } from '../../router/AppRoutes';

export const RequireAuth = () => {
  const { isAuth } = useAuth();

  const location = useLocation();

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTERS.LOGIN} state={{ from: location }} replace />
  );
};
