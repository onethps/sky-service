import Dashboard from '../pages/Dashboard/Dashboard';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProductTableList } from 'pages/Products/ProductTableList';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../store/reducers/products';
import { ProductSklad } from '../pages/Products/ProductSklad';

export const ROUTERS = {
  HOME: '/',
  PRODUCTS_ALL: 'products/all',
  PRODUCTS_SKLAD: '/products/sklad',
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
        <Route path={ROUTERS.PRODUCTS_SKLAD} element={<ProductSklad />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
