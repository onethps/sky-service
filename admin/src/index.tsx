import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from 'redux TK/store';
import { router } from 'router/AppRouter';

import { CssBaseline } from '@mui/material';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <CssBaseline />
    <RouterProvider router={router} />
  </Provider>,
);
