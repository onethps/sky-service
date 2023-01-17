import { ProductType } from 'features/ProductsPage/bll/types';

import { GridColDef, GridColumns, GridValueGetterParams } from '@mui/x-data-grid';

import { INewCardFields } from './types';

export type ProductTypes = 'one' | 'sklad' | 'mod';

export const allProductsFields: INewCardFields[] = [
  {
    _id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Наименование',
  },
  {
    _id: 'productType',
    numeric: false,
    disablePadding: false,
    label: 'Тип',
  },
  {
    _id: 'category',
    numeric: false,
    disablePadding: false,
    label: 'Категория',
  },
  {
    _id: 'netPrice',
    numeric: true,
    disablePadding: false,
    label: 'Себест.',
  },
  {
    _id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Цена',
  },
  {
    _id: 'marginPrice',
    numeric: true,
    disablePadding: false,
    label: 'Наценка',
  },
  {
    _id: 'inSale',
    numeric: false,
    disablePadding: false,
    label: 'В продаже',
  },
];

const productTypes = {
  one: 'Поштучно',
  sklad: 'Склад',
  mod: 'Техкарта',
};

export const allProductsFields2: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Наименование',
    minWidth: 300,
  },
  {
    field: 'productType',
    headerName: 'Тип',
    valueGetter: (params: GridValueGetterParams<any, ProductType>) =>
      `${productTypes[params.row.productType]}`,
  },
  {
    field: 'category',
    headerName: 'Категория',
    type: 'singleSelect',
    valueOptions: ['--', '222', '33333'],
    editable: true,
  },
  {
    field: 'netPrice',
    headerName: 'Себест.',
  },
  {
    field: 'price',
    headerName: 'Цена',
  },
  {
    field: 'marginPrice',
    headerName: 'Наценка',
  },
  {
    field: 'inSale',
    headerName: 'В продаже',
    type: 'singleSelect',
    valueGetter: ({ row }) => `${row.inSale === 'yes' ? 'Да' : 'Нет'}`,
    valueOptions: ['Да', 'Нет'],

    editable: true,
  },
];