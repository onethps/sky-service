import { ProductType } from 'pages/Products/types';

export interface HeadCell {
  disablePadding: boolean;
  _id: keyof ProductType;
  label: string;
  numeric: boolean;
}

export const headCells: readonly HeadCell[] = [
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
    _id: 'netCost',
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
