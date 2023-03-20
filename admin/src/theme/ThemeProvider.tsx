import React, { ReactNode } from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { theme } from './theme';

export const ThemeConfig = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
