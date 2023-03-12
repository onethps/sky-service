import React from 'react';
import { updateProduct } from 'features/ProductsPage/bll/middleware/products';
import { IProduct } from 'interfaces/product.interfaces';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';

import { Alert, AlertProps, Box, Snackbar, styled } from '@mui/material';
import { red, yellow } from '@mui/material/colors';
import { DataGrid, GridRowModel } from '@mui/x-data-grid';

import { columns } from './TableWarehouseConfig';

const DataGridWrapperStyle = styled(Box)(({ theme }) => ({
  height: 500,
  backgroundColor: 'white',
  '& .data-grid-warehouse-quantity-color': {
    backgroundColor: yellow[600],
  },
  '& .data-grid-warehouse-price-color': {
    backgroundColor: red[600],
    color: 'white',
  },
}));

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

  const processRowUpdate = (newRow: GridRowModel<IProduct>) => {
    const data = dispatch(updateProduct({ id: newRow.id!, product: newRow })).unwrap();
    setSnackbar({ children: 'Price successfully saved', severity: 'success' });
    return data.then((res) => res);
  };

  return (
    <DataGridWrapperStyle>
      <DataGrid
        columns={columns}
        rows={products}
        processRowUpdate={processRowUpdate}
        getRowId={(row: IProduct) => row.id!}
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
    </DataGridWrapperStyle>
  );
};
