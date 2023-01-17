import React from 'react';
import { ProductType } from 'features/ProductsPage/bll/types';
import { useAppSelector } from 'shared/hooks/redux-hooks';

import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { columns } from './table-setup';

export const WarehousePage = () => {
  const products = useAppSelector((state) => state.products.products);

  return (
    <Box>
      <DataGrid
        sx={{
          backgroundColor: 'white',
          minWidth: '1000px',
          minHeight: '500px',
        }}
        columns={columns}
        rows={products}
        getRowId={(row: ProductType) => row._id!}
      />
    </Box>
  );
};
