import { ProductType } from 'features/ProductsPage/bll/types';

import EditIcon from '@mui/icons-material/Edit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { makeStyles, Stack, Typography } from '@mui/material';
import {
  GridCellParams,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';

const currency = '₴';

const useStyles = makeStyles({
  root: {
    '& .super-app.red': {
      backgroundColor: 'red', // you need to configure the background colors to the colorKey
      color: '#1a3e72',
      fontWeight: '600',
    },
    '& .super-app.blue': {
      backgroundColor: 'blue',
      color: '#1a3e72',
      fontWeight: '600',
    },
    '& .super-app.orange': {
      backgroundColor: 'orange',
      color: '#1a3e72',
      fontWeight: '600',
    },
  },
});

export const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Наименование',
    minWidth: 300,
  },

  {
    field: 'category',
    headerName: 'Категория',
    type: 'singleSelect',
    valueOptions: ['--', '222', '33333'],
    editable: true,
  },
  {
    field: 'quantity',
    headerName: 'Количество',
    type: 'singleSelect',
    valueOptions: ['--', '222', '33333'],
    valueGetter: (params: GridValueGetterParams<any, ProductType>) =>
      `${Number(params.row.quantity)} ${params.row.unit}`,
    editable: true,
    cellClassName: (params: GridCellParams<ProductType>) => 'super-app-theme--header',
    // `${params.row.quantity <= params.row.minQuantity ? 'super-app-theme--header' : ''}`,
  },

  {
    field: 'netPrice',
    headerName: 'Себест.',
    valueGetter: (params: GridValueGetterParams<any, ProductType>) =>
      `${Number(params.row.netPrice).toFixed(2)} ${currency}`,
  },
  {
    field: 'spend',
    headerName: 'Затрат',
    valueGetter: (params: GridValueGetterParams<any, ProductType>) =>
      `${Number(params.row.quantity * params.row.netPrice).toFixed(2)} ${currency} `,
  },
  {
    field: 'price',
    headerName: 'Цена',
    editable: true,
    type: 'number',
    renderCell: (params: GridRenderCellParams<string>) => (
      <>
        {params.row.productType !== 'mod' && (
          <Stack direction="row" gap="10px" alignItems="center">
            <Typography variant="body2">
              {params.row.price.toFixed(2)} {currency}
            </Typography>
            <EditOutlinedIcon fontSize="small" />
            {/* <Typography>{params.row.price}</Typography> */}
          </Stack>
        )}
      </>
    ),
  },
];
