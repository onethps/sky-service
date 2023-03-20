import { HomePage } from 'features/HomePage/HomePage';
import { NotFoundPage } from 'features/NotFoundPage/NotFoundPage';
import { WarehousePage } from 'features/WarehousePage/WarehousePage';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from 'shared/components/Layout/Layout';

import { ProductsPage } from '../features/ProductsPage/ProductsPage';

export const ROUTES = {
  HOME: '/',
  PRODUCTS_ALL: 'products/all',
  WAREHOUSE: '/products/warehouse',
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.PRODUCTS_ALL, element: <ProductsPage /> },
      { path: ROUTES.WAREHOUSE, element: <WarehousePage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
