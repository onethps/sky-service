import {
  Table as MuiTable,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { IconButton, TableBody } from '@mui/material';
import React, { FC, useState } from 'react';
import Controls from '../Controls/index';
import { categories, categoriesType } from './tableDB';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../pages/Products/selectors';
import { v4 as uuidv4 } from 'uuid';
import Autocomplete from '@mui/material/Autocomplete';
import { ProductType } from '../../pages/Products/types';
import { PlusOne } from '@mui/icons-material';

type tableType = {
  id?: string;
  name: string;
  count: number;
  unit: string;
  price: number;
  sum?: number;
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

const Table = () => {
  const [state, setState] = useState([
    {
      ...initState,
    },
  ]);

  const products = useSelector(selectProducts);

  const handleInputs = (index: number, event: any) => {
    const value: any = [...state];
    if (event.target.name === 'count') {
      value[index].sum = event.target.value * value[index].price;
    }
    value[index][event.target.name] = event.target.value;
    setState(value);
  };

  const addNewRow = () => {
    const value: any = [...state];
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

  const getSumOfProducts = () => {
    return state.reduce((acc, el: tableType) => {
      if (el.sum) acc += el.sum;
      return acc;
    }, 0);
  };

  const getMarginSumOfProducts = () => {
    return state.reduce((acc, el: tableType) => {
      if (el.netPrice) acc += el.netPrice;
      return acc;
    }, 0);
  };

  return (
    <>
      <IconButton onClick={addNewRow}>
        <PlusOne />
      </IconButton>
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
                    renderInput={(params) => <TextField {...params} label={'Name'} />}
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
                    onChange={(e) => handleInputs(index, e)}
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
            {/*spacing between columns*/}
            {[...new Array(4)].map((el, index) => (
              <TableCell key={index.toString()} />
            ))}
            {/*spacing between columns*/}
            <TableCell style={{ width: '10%', whiteSpace: 'nowrap' }}>
              <Typography>{getSumOfProducts()}</Typography>
            </TableCell>
            <TableCell style={{ width: '10%', whiteSpace: 'nowrap' }}>
              <Typography>{getMarginSumOfProducts()}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </MuiTable>
    </>
  );
};

export default Table;
