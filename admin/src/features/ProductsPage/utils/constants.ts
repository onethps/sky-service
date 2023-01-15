import { ProductType } from 'features/ProductsPage/bll/types';

import { INewCardFields } from './types';

export const productsFields: readonly INewCardFields[] = [
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
