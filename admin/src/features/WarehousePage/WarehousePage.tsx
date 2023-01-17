import React from 'react';
import { updateProduct } from 'features/ProductsPage/bll/middleware/products';
import { ProductType } from 'features/ProductsPage/bll/types';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';

import { Alert, AlertProps, Box, Snackbar } from '@mui/material';
import { DataGrid, GridRowModel } from '@mui/x-data-grid';

import { columns } from './table-setup';

export const WarehousePage = () => {
  const products = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();

  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  const processRowUpdate = (newRow: GridRowModel<ProductType>) => {
    const data = dispatch(updateProduct({ id: newRow._id!, product: newRow })).unwrap();
    setSnackbar({ children: 'Price successfully saved', severity: 'success' });
    return data.then((res) => res);
  };

  return (
    <Box
      sx={{
        height: 300,
        width: '100%',
        '& .super-app-theme--header': {
          backgroundColor: 'red',
        },
      }}
    >
      <DataGrid
        columns={columns}
        rows={products}
        processRowUpdate={processRowUpdate}
        getRowId={(row: ProductType) => row._id!}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        experimentalFeatures={{ newEditingApi: true }}
      />
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Box>
  );
};
