import {ExpandLess, ExpandMore, StarBorder} from "@mui/icons-material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {Badge, Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader} from "@mui/material";
import React, {useState} from 'react'
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LabelIcon from '@mui/icons-material/Label';

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

  const [openC, setOpenC] = useState(true);

  const handleClick = () => {
    setOpenC(!openC);
  };


  return (
    <>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Главная" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <Inventory2Icon />
        </ListItemIcon>
        <ListItemText primary="Товары" />
        {openC ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openC} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <LabelIcon />
            </ListItemIcon>
            <ListItemText primary="Все товары" />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton>
        <ListItemIcon>
          <AddShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Статистика" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AddShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Финансы" />
      </ListItemButton>
    </>

  )


}
