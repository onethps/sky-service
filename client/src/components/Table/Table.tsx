import {
  SelectChangeEvent,
  Table as MuiTable,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { IconButton, TableBody } from '@mui/material';
import React, { ChangeEvent, FC, useState } from 'react';
import Controls from '../Controls/index';
import { categories, categoriesType } from './tableDB';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../pages/Products/selectors';
import { v4 as uuidv4 } from 'uuid';
import Autocomplete from '@mui/material/Autocomplete';
import { ProductType } from '../../pages/Products/types';
import { PlusOne } from '@mui/icons-material';
import Button from '@mui/material/Button';

type tableType = {
  id?: string;
  name: string;
  count: number;
  unit: string;
  price: number;
  sum: number;
  netPrice: number;
};
const initState: tableType = {
  id: uuidv4(),
  name: '',
  count: 0,
  unit: 'kg',
  price: 0,
  sum: 0,
  netPrice: 0,
};

const columnSpacing = 3;

const Table = () => {
  const [state, setState] = useState([
    {
      ...initState,
    },
  ]);

  const products = useSelector(selectProducts);

  const [sumOfProducts, setSumOfProducts] = useState<number>(0);
  const [sumOfNetPrice, setSumOfNetPrice] = useState<number>(0);

  const handleInputs = (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value: any[] = [...state];
    const eventVal: number = Number(event.target.value);

    if (event.target.name === 'count') {
      value[index].sum = eventVal * value[index].price;
      calcOfProducts(state, setSumOfProducts, 'sum');
    }
    if (event.target.name === 'sum') {
      calcOfProducts(state, setSumOfProducts, 'sum');
    }
    if (event.target.name === 'netPrice') {
      calcOfProducts(state, setSumOfNetPrice, 'netPrice');
    }

    value[index][event.target.name] = event.target.value;
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
    const value: tableType[] = [...state];
    const newRow = {
      ...initState,
      id: uuidv4(),
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

    const productIndex = products.products.findIndex((el) => el.name === value);
    const currentProduct = products.products[productIndex];
    const values = [...state];

    values[index] = {
      name: currentProduct.name,
      count: 0,
      sum: 0,
      unit: currentProduct.unit,
      price: currentProduct.price,
      netPrice: currentProduct.netCost,
    };
    setState(values);
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
        {state.map((row: tableType, index: number) => {
          return (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell style={{ width: '40%', whiteSpace: 'nowrap' }}>
                <Autocomplete
                  value={row.name}
                  onChange={(event, newValue: string | null) =>
                    handleInput(newValue, index)
                  }
                  renderInput={(params) => (
                    <TextField {...params} label={'Name'} error={row.name === ''} />
                  )}
                  options={[...products.products.map((el: ProductType) => el.name), '']}
                />
              </TableCell>
              <TableCell style={{ width: '10%', whiteSpace: 'nowrap' }}>
                <Controls.Input
                  name={'count'}
                  value={row.count}
                  onChange={(e) => handleInputs(index, e)}
                />
              </TableCell>
              <TableCell style={{ width: '10%', whiteSpace: 'nowrap' }}>
                <Controls.Select
                  name={'unit'}
                  value={row.unit}
                  onChange={(e) => handleSelects(index, e)}
                  options={[{ id: 1, title: 'kg' }]}
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

export default Table;
