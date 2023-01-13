import { App } from '_app';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { CssBaseline } from '@mui/material';
import { Layout } from 'components/Layout/Layout';
import { ProductSklad } from 'pages/Products/ProductSklad';
import { ProductTableList } from 'pages/Products/ProductTableList';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from 'store/store';

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
      { index: true, element: <Dashboard /> },
      { path: ROUTERS.PRODUCTS_ALL, element: <ProductTableList /> },
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
