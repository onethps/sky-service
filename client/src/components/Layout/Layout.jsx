import {Box, Container, CssBaseline, Grid, Toolbar} from "@mui/material";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import React, {useState} from 'react';

const Layout = (props) => {


  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header open={open} setOpen={setOpen} toggleDrawer={toggleDrawer}/>
      <Sidebar open={open} toggleDrawer={toggleDrawer}/>
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
            {props.children}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;