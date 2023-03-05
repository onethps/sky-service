import * as React from 'react';
import { IncomeProductModal } from 'features/HomePage/components/IncomeProduct';

import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { MainListItems, secondaryListItems } from './listItems';

const drawerWidth = 240;

export const ClippedDrawer = () => {
  const [isToggledModal, setIsToggledModal] = React.useState(false);
  return (
    <>
      <IncomeProductModal open={isToggledModal} setOpen={setIsToggledModal} />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: grey[100],
            border: 'none',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', marginTop: 2, paddingX: 1 }}>
          <Button
            onClick={() => setIsToggledModal(true)}
            sx={{
              marginY: 3,
            }}
            variant="contained"
            fullWidth
          >
            Приход Товара
          </Button>
          <MainListItems />
          {secondaryListItems}
        </Box>
      </Drawer>
    </>
  );
};
