import { IProduct } from 'interfaces/product.interfaces';

import { GridColDef, GridColumns, GridValueGetterParams } from '@mui/x-data-grid';

import { INewCardFields } from '../utils/types';

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

export const ProductColFields: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Наименование',
    minWidth: 300,
    flex: 1,
  },
  {
    field: 'productType',
    headerName: 'Тип',
    valueGetter: (params: GridValueGetterParams<any, IProduct>) =>
      `${productTypes[params.row.type]}`,
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
    field: 'netPrice',
    headerName: 'Себест.',
    minWidth: 150,
    flex: 1,
  },
  {
    field: 'price',
    headerName: 'Цена',
    minWidth: 150,
    flex: 1,
  },
  {
    field: 'marginPrice',
    headerName: 'Наценка',
    minWidth: 150,
    flex: 1,
  },
  {
    field: 'inSale',
    minWidth: 150,
    flex: 1,
    headerName: 'В продаже',
    type: 'singleSelect',
    valueGetter: ({ row }) => `${row.inSale === 'yes' ? 'Да' : 'Нет'}`,
    valueOptions: ['Да', 'Нет'],
    editable: true,
  },
];

export const unitValues = [
  { id: '1', value: 'шт.' },
  { id: '2', value: 'кг.' },
  { id: '3', value: 'гр.' },
  { id: '4', value: 'л.' },
];

export const CATEGORIES_ARRAY = [{ id: '1', value: '--' }];
export const NAME_LABEL = 'Наименование';
export const CATEGORIES_LABEL = 'Категория';
export const IN_SALE_CHECKBOX_LABEL = 'Выставить на продажу';
export const QUANTITY_LABEL = 'Колличество';
export const MIN_QUANTITY_LABEL = 'Минимальный остаток';
export const MARGIN_PERCENT = 'Наценка';
export const UNIT_VALUE_LABEL = 'Еденица Измерения';
export const NET_COST = 'Себестоимость';
export const PRICE = 'Цена';
export const COMPOSITION_NAME = 'Наименовние состава';
