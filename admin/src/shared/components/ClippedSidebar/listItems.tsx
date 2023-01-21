import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from 'router/constants';

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

import { sideBarRoutes } from './constants';

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
      <ListItemButton onClick={() => handleRouteClick('/')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary={sideBarRoutes.HOME.title} />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <Inventory2Icon />
        </ListItemIcon>
        <ListItemText primary={'Товары'} />
        {openCollapseMenu ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCollapseMenu} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => handleRouteClick(routes.PRODUCTS_ALL)}
          >
            <ListItemIcon>
              <LabelIcon />
            </ListItemIcon>
            <ListItemText primary={sideBarRoutes.PRODUCTS_ALL.title} />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => handleRouteClick(routes.WAREHOUSE)}
          >
            <ListItemIcon>
              <LabelIcon />
            </ListItemIcon>
            <ListItemText primary={sideBarRoutes.PRODUCTS_SKLAD.title} />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton>
        <ListItemIcon>
          <AddShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary={sideBarRoutes.STATISTIC.title} />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AddShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary={sideBarRoutes.FINANCE.title} />
      </ListItemButton>
    </>
  );
};
