import Dashboard from '../pages/Dashboard/Dashboard';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProductTableList } from 'pages/Products/ProductTableList';

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path={'/'} element={<Dashboard />} />
        <Route path={'products/all'} element={<ProductTableList />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
