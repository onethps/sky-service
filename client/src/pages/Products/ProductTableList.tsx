import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import * as React from 'react';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import Controls from '../../components/Controls';
import EditProductModal from './EditProductModal/EditProductModal';
import Layout from '../../components/Layout/Layout';
import { HeadCell, headCells } from './tableData';
import { PRODUCT_TYPES, ProductType } from 'pages/Products/types';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts } from 'pages/Products/selectors';
import { fetchProducts } from 'store/reducers/products';
import { TableRowNormal } from 'components/TableRow/TableRowNormal';
import { v4 as uuidv4 } from 'uuid';
import { Typography } from '@mui/material';
import { TableRowGroup } from '../../components/TableRow/TableRowGroup';

export type cat = {
  id: string;
  title: string;
};

const arrayOfCategories: cat[] = [
  { id: uuidv4(), title: '--' },
  { id: uuidv4(), title: 'Напитки' },
  { id: uuidv4(), title: 'Лапша' },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const EnhancedTableHead: FC<EnhancedTableProps> = (props) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property: string) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell: HeadCell) => (
          <TableCell
            key={headCell._id as string}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell._id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell._id}
              direction={orderBy === headCell._id ? order : 'asc'}
              onClick={createSortHandler(headCell._id as string)}
            >
              {headCell.label}

              {orderBy === headCell._id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export const ProductTableList = () => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('inSale');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [categoryEl, setCategoryEl] = useState('--');

  const [openModal, setOpenModal] = useState<boolean>(false);

  const { products } = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, []);

  // @ts-ignore
  const handleRequestSort = (event: MouseEvent<unknown, MouseEvent>, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleCategory = (event: any) => {
    setCategoryEl(event.target.value);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = products.map((n: any) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: any, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const [currentProductCard, setCurrentProductCard] = useState<ProductType | null>(null);

  const findProduct = (id: string) => {
    const filter = products.filter((el: ProductType) => el._id === id)[0];
    setCurrentProductCard(filter);
  };

  const handleModal = (id: string) => {
    findProduct(id);
    setOpenModal(true);
  };

  const handleAddNewProduct = () => {
    setCurrentProductCard(null);
    setOpenModal(true);
  };

  return (
    <Layout>
      <EditProductModal
        open={openModal}
        setOpen={setOpenModal}
        currentProduct={currentProductCard}
      />
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={products.length}
              />

              <TableBody>
                {stableSort(products, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: ProductType, index) => {
                    const isItemSelected = isSelected(row.name as string);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return !(row.productType === PRODUCT_TYPES[1].title) ? (
                      <TableRowNormal
                        key={row._id}
                        isItemSelected={isItemSelected}
                        row={row}
                        handleClick={handleClick}
                        labelId={labelId}
                        handleModal={handleModal}
                        categoryEl={categoryEl}
                        handleCategory={handleCategory}
                        arrayOfCategories={arrayOfCategories}
                      />
                    ) : (
                      <TableRowGroup
                        key={row._id}
                        isItemSelected={isItemSelected}
                        row={row}
                        handleClick={handleClick}
                        labelId={labelId}
                        handleModal={handleModal}
                        categoryEl={categoryEl}
                        handleCategory={handleCategory}
                        arrayOfCategories={arrayOfCategories}
                      />
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Controls.Button text={'ADD'} onClick={handleAddNewProduct} />
      </Box>
    </Layout>
  );
};
