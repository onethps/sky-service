import Products from '../pages/Products/Products';
import Dashboard from '../pages/Dashboard/Dashboard';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path={'/'} element={<Dashboard />} />
        <Route path={'products/all'} element={<Products />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
