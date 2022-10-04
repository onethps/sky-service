import { productCardTypeRow } from 'pages/Products/Products';

export interface HeadCell {
  disablePadding: boolean;
  id: keyof productCardTypeRow;
  label: string;
  numeric: boolean;
}

export const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Наименование',
  },
  {
    id: 'productType',
    numeric: false,
    disablePadding: false,
    label: 'Тип',
  },
  {
    id: 'category',
    numeric: false,
    disablePadding: false,
    label: 'Категория',
  },
  {
    id: 'netCost',
    numeric: true,
    disablePadding: false,
    label: 'Себест.',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Цена',
  },
  {
    id: 'marginPrice',
    numeric: true,
    disablePadding: false,
    label: 'Наценка',
  },
  {
    id: 'inSale',
    numeric: false,
    disablePadding: false,
    label: 'В продаже',
  },
];
