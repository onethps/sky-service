import * as React from 'react';
import { IncomeProductModal } from 'features/HomePage/components/IncomeProduct';

import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';

import { MainListItems, secondaryListItems } from './listItems';

const drawerWidth = 300;

export const Sidebar = () => {
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
