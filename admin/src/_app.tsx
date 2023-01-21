import { RouterProvider } from 'react-router-dom';
import { router } from 'router/AppRouter';

import { CssBaseline } from '@mui/material';

export const App = () => {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
};
