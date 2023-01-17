import { HomePage } from 'features/HomePage/HomePage';
import { NotFoundPage } from 'features/NotFoundPage/NotFoundPage';
import { WarehousePage } from 'features/WarehousePage/WarehousePage';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from 'shared/components/Layout/Layout';

import { ProductsPage } from '../features/ProductsPage/ProductsPage';

import { routes } from './constants';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: routes.PRODUCTS_ALL, element: <ProductsPage /> },
      { path: routes.WAREHOUSE, element: <WarehousePage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
