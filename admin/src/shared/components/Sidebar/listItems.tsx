import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LabelIcon from '@mui/icons-material/Label';
import {
  Badge,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';

export const secondaryListItems = (
  <>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AddShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AddShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AddShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </>
);

const ROUTES = {
  HOME: {
    title: 'Главная',
    link: '/',
  },
  PRODUCTS_ALL: {
    title: 'Все Товары',
    link: '/products/all',
  },
  PRODUCTS_SKLAD: {
    title: 'Складские товары',
    link: '/products/sklad',
  },
  STATISTIC: {
    title: 'Статистика',
    link: '/statistic',
  },
  FINANCE: {
    title: 'Финансы',
    link: '/finance',
  },
};

export const MainListItems = () => {
  const navigate = useNavigate();
  const [openCollapseMenu, setOpenCollapseMenu] = useState(false);

  const handleClick = () => {
    setOpenCollapseMenu(!openCollapseMenu);
  };

  const handleRouteClick = (link: string) => {
    navigate(link);
  };

  return (
    <>
      <ListItemButton onClick={() => handleRouteClick(ROUTES.HOME.link)}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary={ROUTES.HOME.title} />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <Inventory2Icon />
        </ListItemIcon>
        <ListItemText primary={'Товари'} />
        {openCollapseMenu ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCollapseMenu} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => handleRouteClick(ROUTES.PRODUCTS_ALL.link)}
          >
            <ListItemIcon>
              <LabelIcon />
            </ListItemIcon>
            <ListItemText primary={ROUTES.PRODUCTS_ALL.title} />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => handleRouteClick(ROUTES.PRODUCTS_SKLAD.link)}
          >
            <ListItemIcon>
              <LabelIcon />
            </ListItemIcon>
            <ListItemText primary={ROUTES.PRODUCTS_SKLAD.title} />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton>
        <ListItemIcon>
          <AddShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary={ROUTES.STATISTIC.title} />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AddShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary={ROUTES.FINANCE.title} />
      </ListItemButton>
    </>
  );
};
