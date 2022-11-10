import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import clsx from 'clsx';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectProducts } from 'pages/Products/selectors';
import { ProductType } from 'pages/Products/types';

const currencyFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'USD',
});

const columns: any = [
  { field: 'name', headerName: 'Наименование', width: 180, editable: true },
  {
    field: 'category',
    headerName: 'Категория',
    type: 'singleSelect',
    valueOptions: ['--'],
    editable: true,
  },
  {
    field: 'quantity',
    headerName: 'Количество',
    type: 'number',
    width: 180,
    editable: true,
    valueGetter: (param: any) => `${param.row.quantity} ${param.row.unit || ''}`,
    cellClassName: (params: GridCellParams<ProductType>) => {
      if (params.value == null) {
        return '';
      }

      return clsx('super-app', {
        positive: params.value <= params.row.minQuantity,
      });
    },
  },
  {
    field: 'netPrice',
    headerName: 'Стоимость',
    type: 'number',
    width: 180,
    editable: true,
    valueFormatter: ({ value }: { value: number }) => currencyFormatter.format(value),
    cellClassName: 'font-tabular-nums',
  },
  {
    field: 'spend',
    headerName: 'Потрачено',
    type: 'number',
    width: 180,
    editable: true,
    valueGetter: (params: any) =>
      currencyFormatter.format(params.row.price * params.row.quantity),
    cellClassName: 'font-tabular-nums',
  },
  {
    field: 'price',
    headerName: 'Цена',
    type: 'number',
    width: 180,
    editable: true,
    cellClassName: 'font-tabular-nums',
    valueFormatter: ({ value }: { value: number }) => currencyFormatter.format(value),
  },
];

export const ProductSklad = () => {
  const data = useSelector(selectProducts);

  const filterModProducts = data.products.filter((product) => !product.mod.length);

  if (!filterModProducts) {
    return <div>loadi ng</div>;
  }

  return (
    <Box
      sx={{
        height: 300,
        width: '100%',
        '& .super-app-theme--cell': {
          backgroundColor: 'rgba(224, 183, 60, 0.55)',
          color: '#1a3e72',
          fontWeight: '600',
        },
        '& .super-app.negative': {
          backgroundColor: 'rgba(157, 255, 118, 0.49)',
          color: '#1a3e72',
          fontWeight: '600',
        },
        '& .super-app.positive': {
          backgroundColor: '#d47483',
          color: '#1a3e72',
          fontWeight: '600',
        },
      }}
    >
      <DataGrid
        getRowId={(row: ProductType) => row._id!}
        rows={filterModProducts}
        columns={columns}
        checkboxSelection
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
};
