import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'shared/components/Header/Header';

import { Box, Container, Grid, Toolbar } from '@mui/material';
import { grey } from '@mui/material/colors';

import AppBarHeader from '../AppBarHeader/AppBarHeader';
import ClippedDrawer from '../ClippedSidebar/ClippedSidebar';

export const Layout = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBarHeader />
      <ClippedDrawer />
      {/* <Header open={open} toggleDrawer={toggleDrawer} /> */}
      {/* <Sidebar open={open} toggleDrawer={toggleDrawer} /> */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: grey[100], minHeight: '100vh' }}
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
