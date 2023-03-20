import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
  },
  palette: {
    background: {
      default: '#f6f8fc',
    },
  },
});
