import Dashboard from '../pages/Dashboard/Dashboard';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProductTableList } from 'pages/Products/ProductTableList';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../store/reducers/products';

export const ROUTERS = {
  HOME: '/',
  PRODUCTS_ALL: 'products/all',
};

const AppRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, []);

  return (
    <div>
      <Routes>
        <Route path={ROUTERS.HOME} element={<Dashboard />} />
        <Route path={ROUTERS.PRODUCTS_ALL} element={<ProductTableList />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
