import { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import { Controls } from 'components/Controls';
import { categories, categoriesType } from 'data/table.data';
import { initTableState } from 'pages/Dashboard/IncomeProductModal/IncomeProductModal';
import { NewProductModal } from 'pages/Dashboard/IncomeProductModal/NewProductModal/NewProductModal';
import { selectProducts } from 'pages/Products/selectors';
import { ProductType } from 'pages/Products/types';
import { useSelector } from 'react-redux';

import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import {
  IconButton,
  SelectChangeEvent,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const columnSpacing = 3;

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 15px',
  color: theme.palette.primary.main,
  fontWeight: '700',
  cursor: 'pointer',
}));

const GroupItems = styled('ul')({
  padding: 0,
});

type TableType = {
  state: ProductType[];
  setState: (table: ProductType[]) => void;
};

export const Table: FC<TableType> = ({ state, setState }) => {
  const { products } = useSelector(selectProducts);

  const [sumOfProducts, setSumOfProducts] = useState<number>(0);
  const [sumOfNetPrice, setSumOfNetPrice] = useState<number>(0);

  const handleInputs = (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value: any[] = [...state];
    const eventVal = Number(event.target.value);

    if (event.target.name === 'quantity') {
      value[index].sum = eventVal * value[index].price;
      calcOfProducts(state, setSumOfProducts, 'sum');
    }
    if (event.target.name === 'sum') {
      calcOfProducts(state, setSumOfProducts, 'sum');
    }
    if (event.target.name === 'netPrice') {
      calcOfProducts(state, setSumOfNetPrice, 'netPrice');
    }

    value[index][event.target.name] = Number(event.target.value)
      ? +event.target.value
      : event.target.value;
    setState(value);
  };

  const handleSelects = (index: number, event: SelectChangeEvent<unknown>) => {
    const value: any = [...state];
    value[index][event.target.name] = event.target.value;
    setState(value);
  };

  const calcOfProducts = (
    state: any[],
    setState: (number: number) => void,
    val: string,
  ) => {
    const calcVal = state.reduce((acc, el) => acc + Number(el[val]), 0);
    setState(calcVal);
  };

  const addNewRow = () => {
    const value: ProductType[] = [...state];
    const newRow: ProductType = {
      ...initTableState,
    };
    value.push(newRow);
    setState(value);
  };
  const handleRemoveTableRow = (index: number) => {
    const value: any = [...state];
    value.splice(index, 1);
    setState(value);
  };

  const handleInput = (value: string | null, index: number) => {
    if (!value) {
      return;
    }

    const productIndex = products.findIndex((el) => el.name === value);
    const currentProduct = products[productIndex];
    const values = [...state];

    values[index] = { ...currentProduct };
    setState(values);
  };

  const [openNewProductModal, setOpenNewProductModal] = useState(false);

  const handleName = (event: SyntheticEvent, newValue: string | null, index: number) => {
    handleInput(newValue, index);
  };

  const addNewProductModalToggle = () => {
    setOpenNewProductModal(true);
  };

  const setNewProductInTableRow = (index: number, newProduct: ProductType) => {
    const tableData = [...state];

    tableData[index] = { ...newProduct };
    setState(tableData);
  };

  return (
    <MuiTable>
      <TableHead>
        <TableRow>
          {categories.map((headText: categoriesType) => (
            <TableCell align="left" key={headText.id}>
              {headText.title}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {state.map((row: ProductType, index: number) => {
          return (
            <>
              <NewProductModal
                open={openNewProductModal}
                setOpen={setOpenNewProductModal}
                index={index}
                setNewProductInTableRow={setNewProductInTableRow}
              />
              <TableRow
                key={row.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell style={{ width: '40%', whiteSpace: 'nowrap' }}>
                  <Autocomplete
                    value={row.name}
                    defaultValue={null}
                    onChange={(event, newValue) => handleName(event, newValue, index)}
                    renderInput={(params) => (
                      <TextField {...params} label={'Name'} error={row.name === ''} />
                    )}
                    groupBy={(o) => ' '}
                    options={
                      products.length ? products.map((el: ProductType) => el.name) : [' ']
                    }
                    renderGroup={(params) => (
                      <>
                        <GroupHeader onClick={addNewProductModalToggle}>
                          Додати товар
                        </GroupHeader>
                        <GroupItems>{params.children}</GroupItems>
                      </>
                    )}
                  />
                </TableCell>
                <TableCell style={{ width: '10%', whiteSpace: 'nowrap' }}>
                  <Controls.Input
                    name={'quantity'}
                    value={row.quantity}
                    onChange={(e) => handleInputs(index, e)}
                  />
                </TableCell>
                <TableCell style={{ width: '10%', whiteSpace: 'nowrap' }}>
                  <Controls.Select
                    name={'unit'}
                    disabled={row.unit === ''}
                    value={row.unit}
                    onChange={(e) => handleSelects(index, e)}
                    options={[{ id: 1, title: 'шт' }]}
                  />
                </TableCell>
                <TableCell style={{ width: '10%', whiteSpace: 'nowrap' }}>
                  <Controls.Input
                    name={'price'}
                    value={row.price}
                    onChange={(e) => handleInputs(index, e)}
                  />
                </TableCell>
                <TableCell style={{ width: '10%', whiteSpace: 'nowrap' }}>
                  <Controls.Input
                    name={'sum'}
                    value={row.sum}
                    onChange={(e) => handleInputs(index, e)}
                  />
                </TableCell>
                <TableCell style={{ width: '10%', whiteSpace: 'nowrap' }}>
                  <Controls.Input
                    name={'netPrice'}
                    value={row.netPrice}
                    onChange={(e) => handleInputs(index, e)}
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleRemoveTableRow(index)}
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <DeleteSweepIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </>
          );
        })}
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell style={{ width: '10%', whiteSpace: 'nowrap' }}>
            <Button variant={'contained'} color={'success'} onClick={addNewRow}>
              +
            </Button>
          </TableCell>
          {/*spacing between columns*/}
          {[...new Array(columnSpacing)].map((el, index) => (
            <TableCell key={index.toString()} />
          ))}
          {/*spacing between columns*/}
          <TableCell style={{ width: '10%', whiteSpace: 'nowrap' }}>
            <Typography>{sumOfProducts} ₴</Typography>
          </TableCell>
          <TableCell style={{ width: '10%', whiteSpace: 'nowrap' }}>
            <Typography>{sumOfNetPrice} ₴</Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </MuiTable>
  );
};
