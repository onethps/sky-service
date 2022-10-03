export type headCellsTypes = {
  id: number;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
};

export const headCells: headCellsTypes[] = [
  {
    id: 1,
    numeric: false,
    disablePadding: true,
    label: 'Наименование',
  },
  {
    id: 2,
    numeric: false,
    disablePadding: false,
    label: 'Тип',
  },
  {
    id: 3,
    numeric: false,
    disablePadding: false,
    label: 'Категория',
  },
  {
    id: 4,
    numeric: true,
    disablePadding: false,
    label: 'Себест.',
  },
  {
    id: 5,
    numeric: true,
    disablePadding: false,
    label: 'Цена',
  },
  {
    id: 6,
    numeric: true,
    disablePadding: false,
    label: 'Наценка',
  },
  {
    id: 7,
    numeric: false,
    disablePadding: false,
    label: 'В продаже',
  },
];
