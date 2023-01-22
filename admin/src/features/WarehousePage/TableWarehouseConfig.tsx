import { ProductType } from 'features/ProductsPage/bll/types';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Stack, Typography } from '@mui/material';
import {
  GridCellParams,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';

const currency = '₴';

export const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Наименование',
    minWidth: 300,
    flex: 1,
  },

  {
    field: 'category',
    headerName: 'Категория',
    type: 'singleSelect',
    valueOptions: ['--', '222', '33333'],
    editable: true,
    minWidth: 150,
    flex: 1,
  },
  {
    field: 'quantity',
    headerName: 'Количество',
    type: 'singleSelect',
    valueOptions: ['--', '222', '33333'],
    valueGetter: (params: GridValueGetterParams<any, ProductType>) =>
      `${Number(params.row.quantity)} ${params.row.unit}`,
    cellClassName: (params: GridCellParams<ProductType>) => {
      if (params.row.quantity <= params.row.minQuantity) {
        return 'data-grid-warehouse-quantity-color';
      }
      return '';
    },
    minWidth: 150,
    flex: 1,
  },

  {
    field: 'netPrice',
    minWidth: 150,
    flex: 1,
    headerName: 'Себест.',
    valueGetter: (params: GridValueGetterParams<any, ProductType>) =>
      `${Number(params.row.netPrice).toFixed(2)} ${currency}`,
  },

  {
    field: 'spend',
    minWidth: 150,
    flex: 1,
    headerName: 'Затрат',
    valueGetter: (params: GridValueGetterParams<any, ProductType>) =>
      `${Number(params.row.quantity * params.row.netPrice).toFixed(2)} ${currency} `,
  },
  {
    field: 'price',
    minWidth: 150,
    flex: 1,
    headerName: 'Цена',
    editable: true,
    type: 'number',
    renderCell: (params: GridRenderCellParams<string>) => {
      return (
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
      );
    },
    cellClassName: (params: GridCellParams<ProductType>) => {
      if (params.row.price === 0 && params.row.productType !== 'mod') {
        return 'data-grid-warehouse-price-color';
      }
      return '';
    },
  },
];
