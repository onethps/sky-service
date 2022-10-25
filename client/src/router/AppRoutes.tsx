import Dashboard from '../pages/Dashboard/Dashboard';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { fetchProducts } from '../store/slices/products';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import { useAppDispatch } from '../hooks/redux-hooks';
import Layout from '../components/Layout/Layout';
import { Missing } from '../pages/Missing/Missing';
import { RequireAuth } from '../components/RequireAuth/RequireAuth';
import { ProductsAll } from '../pages/Products/ProductsAll';

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
    <Routes>
      <Route path={'/'} element={<Layout />}>
        {/*public routes*/}
        <Route path={ROUTERS.LOGIN} element={<Login />} />
        <Route path={ROUTERS.REGISTER} element={<Register />} />

        {/*protect routes*/}
        <Route element={<RequireAuth />}>
          <Route path={ROUTERS.HOME} element={<Dashboard />} />
          <Route path={ROUTERS.PRODUCTS_ALL} element={<ProductsAll />} />
        </Route>
        {/*catch all*/}
        <Route path={'*'} element={<Missing />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
