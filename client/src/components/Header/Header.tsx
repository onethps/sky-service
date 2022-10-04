import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  AppBarProps,
  Badge,
  IconButton,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import React, { FC } from 'react';

const drawerWidth = 240;

interface HeaderTypes extends AppBarProps {
  open: any;
  toggleDrawer: (bool: any) => void;
}

const Header: FC<HeaderTypes> = ({ open, toggleDrawer }) => {
  return (
    <AppBar position="absolute">
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Dashboard
        </Typography>

        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <ExpandCircleDownIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
