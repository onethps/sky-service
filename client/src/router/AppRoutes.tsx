import Dashboard from '../pages/Dashboard/Dashboard';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { fetchProducts } from '../store/slices/products';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import { useAppDispatch } from '../hooks/redux-hooks';

export const ROUTERS = {
  HOME: '/',
  PRODUCTS_ALL: 'products/all',
  LOGIN: '/login',
  REGISTER: '/register',
};

const AppRoutes = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div>
      <Routes>
        <Route path={ROUTERS.HOME} element={<Dashboard />} />
        <Route path={ROUTERS.LOGIN} element={<Login />} />
        <Route path={ROUTERS.REGISTER} element={<Register />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
