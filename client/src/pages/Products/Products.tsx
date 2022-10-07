import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Collapse,
  FormControl,
  MenuItem,
  Select,
  SortDirection,
  TableProps,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import * as React from 'react';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import Controls from '../../components/Controls';
import EditProductModal from './EditProductModal/EditProductModal';
import Layout from '../../components/Layout/Layout';
import { HeadCell, headCells } from './tableData';
import { instance } from 'api/config';
import { ProductType } from 'pages/Products/types';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts } from 'pages/Products/selectors';
import { fetchProducts } from 'store/reducers/products';

const arrayOfCategories = [
  { id: 1, title: '--' },
  { id: 2, title: 'Напитки' },
  { id: 3, title: 'Лапша' },
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
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
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
            key={headCell.id as string}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id as string)}
            >
              {headCell.label}

              {orderBy === headCell.id ? (
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

export default function EnhancedTable() {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('inSale');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [categoryEl, setCategoryEl] = useState('--');
  const [openModal, setOpenModal] = useState(false);

  const productCardsList1 = useSelector(selectProducts);
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
      const newSelected = productCardsList1.products.map((n: any) => n.name);
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
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - productCardsList1.products.length)
      : 0;

  const [currentProductCard, setCurrentProductCard] = useState<ProductType | null>(null);

  const findProduct = (id: string) => {
    const filter = productCardsList1.products.filter(
      (el: ProductType) => el._id === id,
    )[0];
    setCurrentProductCard(filter);
  };

  const handleModal = (id: string) => {
    findProduct(id);
    setOpenModal(true);
  };

  const handleAddNewProducut = () => {
    setCurrentProductCard(null);
    setOpenModal(true);
  };
  const [open, setOpen] = React.useState(false);

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
                rowCount={productCardsList1.products.length}
              />

              <TableBody>
                {stableSort(productCardsList1.products, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name as string);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            onClick={(event) => handleClick(event, row.name as string)}
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          onClick={() => handleModal(row._id as string)}
                        >
                          {row.name}
                        </TableCell>

                        <TableCell
                          align="left"
                          onClick={() => handleModal(row._id as string)}
                        >
                          {row.productType}
                        </TableCell>
                        <TableCell align={'left'}>
                          <FormControl>
                            <Select
                              autoWidth
                              id="category-select"
                              value={row.category || categoryEl}
                              onChange={handleCategory}
                            >
                              {arrayOfCategories.map((el) => (
                                <MenuItem value={el.title} key={el.id}>
                                  {el.title}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell
                          align="right"
                          onClick={() => handleModal(row._id as string)}
                        >
                          {row.netCost} ₴
                        </TableCell>
                        <TableCell
                          align="right"
                          onClick={() => handleModal(row._id as string)}
                        >
                          {row.price} ₴
                        </TableCell>
                        <TableCell
                          align="right"
                          onClick={() => handleModal(row._id as string)}
                        >
                          {row.marginPrice} %
                        </TableCell>
                        <TableCell align="left">
                          <FormControl size="small">
                            <Select
                              autoWidth
                              id="select-inSale-status"
                              value={row.inSale}
                              // onChange={}
                            >
                              <MenuItem value={1}>Да</MenuItem>
                              <MenuItem value={0}>Нет</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
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

                {/**/}
                <TableRow>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => setOpen(!open)}
                    >
                      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    vasya
                  </TableCell>
                  <TableCell align="right">h</TableCell>
                  <TableCell align="right">h2</TableCell>
                  <TableCell align="right">h3</TableCell>
                  <TableCell align="right">h4</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Table size="small" aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              <TableCell>Function name</TableCell>
                              <TableCell align="center">User1</TableCell>
                              <TableCell align="center">User 2</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {/*{row.history.map((historyRow) => (*/}
                            {/*  <TableRow key={historyRow.date}>*/}
                            {/*    <TableCell component="th" scope="row">*/}
                            {/*      {historyRow.date}*/}
                            {/*    </TableCell>*/}
                            {/*    <TableCell align="center">*/}
                            {/*      {historyRow.customerId}*/}
                            {/*    </TableCell>*/}
                            {/*    <TableCell align="center">{historyRow.amount}</TableCell>*/}
                            {/*  </TableRow>*/}
                            {/*))}*/}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
                {/*/////////////////////*/}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={productCardsList1.products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Controls.Button text={'ADD'} onClick={handleAddNewProducut} />
      </Box>
    </Layout>
  );
}
