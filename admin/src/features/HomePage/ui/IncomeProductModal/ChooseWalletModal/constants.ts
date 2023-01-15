import { GridColDef } from '@mui/x-data-grid';

export const walletFields: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 0.1 },
  {
    field: 'name',
    headerName: 'Name',
    editable: false,
    flex: 1,
  },
  {
    field: 'balance',
    headerName: 'Balance',
    type: 'number',
    flex: 1,
    editable: false,
    align: 'left',
    headerAlign: 'left',
  },
];

export const mockRows = [
  { id: 1, name: 'Balance 1', balance: 45 },
  { id: 2, name: 'Balance 2', balance: 456 },
];
