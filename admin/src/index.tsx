import { ProductsPage } from 'features/ProductsPage/ProductsPage';
import { ProductSklad } from 'features/ProductsPage/ui/ProductSklad';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from 'redux TK/store';
import { Layout } from 'shared/components/Layout/Layout';

import { CssBaseline } from '@mui/material';

import { HomePage } from './features/HomePage/HomePage';

export const ROUTERS = {
  HOME: '/',
  PRODUCTS_ALL: 'products/all',
  PRODUCTS_SKLAD: '/products/sklad',
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTERS.PRODUCTS_ALL, element: <ProductsPage /> },
      { path: ROUTERS.PRODUCTS_SKLAD, element: <ProductSklad /> },
    ],
  },
]);

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <CssBaseline />
    <RouterProvider router={router} />
  </Provider>,
);
