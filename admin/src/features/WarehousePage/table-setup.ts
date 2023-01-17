import { ProductType } from 'features/ProductsPage/bll/types';

import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

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
    editable: true,
  },

  {
    field: 'netPrice',
    headerName: 'Себест.',
  },
  {
    field: 'spend',
    headerName: 'Затрат',
    valueGetter: (params: GridValueGetterParams<any, ProductType>) =>
      `${params.row.quantity * params.row.netPrice}`,
  },
  {
    field: 'price',
    headerName: 'Цена',
  },
];
