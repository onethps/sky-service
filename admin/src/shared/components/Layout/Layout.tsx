import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'shared/components/Header/Header';
import Sidebar from 'shared/components/Sidebar/Sidebar';

import { Box, Container, Grid, Toolbar } from '@mui/material';

export const Layout = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Header open={open} toggleDrawer={toggleDrawer} />
      <Sidebar open={open} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 2, mb: 1 }}>
          <Grid container>
            <Outlet />
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};