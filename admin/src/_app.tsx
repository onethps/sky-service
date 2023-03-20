import { RouterProvider } from 'react-router-dom';
import { router } from 'router/AppRouter';
import { ThemeConfig } from 'theme/ThemeProvider';

import { CssBaseline } from '@mui/material';

export const App = () => {
  return (
    <ThemeConfig>
      <RouterProvider router={router} />
    </ThemeConfig>
  );
};
