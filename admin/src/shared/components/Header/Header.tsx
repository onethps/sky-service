import { FC, useState } from 'react';
import { IProduct } from 'interfaces/product.interfaces';
import { useLocation } from 'react-router-dom';
import { routes } from 'router/constants';

import { InsertEmoticon } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Badge, Box, IconButton, styled, Toolbar } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Button from '@mui/material/Button';

const drawerWidth = 240;

interface HeaderTypes extends AppBarProps {
  open: any;
  toggleDrawer: (bool: any) => void;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header: FC<HeaderTypes> = () => {
  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentProductCard, _] = useState<IProduct | null>(null);

  const location = useLocation();
  const isProductPUrlPath = location.pathname === `/${routes.PRODUCTS_ALL}`;

  return (
    <>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Button
              onClick={() => setOpenModal(true)}
              sx={{ display: !isProductPUrlPath ? 'none' : 'block' }}
              variant={'contained'}
              color={'success'}
            >
              Добавить
            </Button>
            <Button variant={'contained'} color={'error'}>
              Точка 1
            </Button>
          </Box>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <InsertEmoticon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
