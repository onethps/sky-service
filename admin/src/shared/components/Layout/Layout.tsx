import { Outlet } from 'react-router-dom';

import { Box, Container } from '@mui/material';
import { grey } from '@mui/material/colors';

import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';

export const Layout = () => {
  return (
    <Box>
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{
          marginTop: '80px',
          marginLeft: '320px',
        }}
      >
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};
