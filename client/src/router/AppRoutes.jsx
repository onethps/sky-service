import StartEditButtonGrid from "../pages/Products1";
import DataGridDemo from "../pages/Products1";
import Dashboard from "../pages/Dashboard";
import React from 'react';
import {Route, Routes} from 'react-router-dom'
import Products from "../pages/Products";

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