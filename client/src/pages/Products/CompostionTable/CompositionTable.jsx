import {
  Box,
  Button,
  Divider,
  Table as MuiTable,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { IconButton, TableBody } from '@mui/material';
import React, { useState } from 'react';
import Controls from '../../../components/Controls';
import { grey } from '@mui/material/colors';
import { v4 as uuidv4 } from 'uuid';

const greyBg = grey[200];

const categories = [
  {
    id: 1,
    title: 'Наименование',
  },
  {
    id: 2,
    title: 'Кол-во',
  },
  {
    id: 4,
    title: 'Брутто',
  },
  {
    id: 5,
    title: 'Нетто',
  },
  {
    id: 6,
    title: 'Цена',
  },
  {
    id: 7,
    title: 'Сумма',
  },
  {
    id: 8,
    title: ' ',
  },
];

const initState = {
  id: uuidv4(),
  name: '',
  count: '',
  brutto: 0,
  netto: 0,
  price: 0,
  summ: 0.0,
};

export default function CompositionTable({ initIngredients }) {
  const [state, setState] = useState([
    {
      ...initIngredients.ingredients,
    },
  ]);

  const handleInputs = (index, event) => {
    const value = state;
    value[index][event.target.name] = event.target.value;
    setState({
      ...state,
      id: uuidv4(),
      value,
    });
  };
  const handleRemoveTableRow = (index) => {
    const values = state;

    values.splice(index, 1);
    console.log(values);
    setState([...values]);
  };

  const addNewRowHandleButton = () => {
    setState([...state, { ...initState }]);
  };
  return (
    <Box sx={{ bgcolor: greyBg, padding: 4 }}>
      <Controls.AutoCompleteInput />

      <Typography variant={'h5'} sx={{ fontWeight: '700', padding: '15px 0' }}>
        Состав
      </Typography>
      <Divider sx={{ m: '20px 0' }} />
      <MuiTable>
        <TableHead>
          <TableRow>
            {categories.map((headText) => (
              <TableCell align="left" key={headText.id}>
                {headText.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {state.map((row, index) => {
            return (
              <TableRow
                key={row.id}
                sx={{
                  '.MuiTableCell-root': {
                    border: 0,
                    padding: 1,
                  },
                }}
              >
                <TableCell>
                  <Controls.AutoCompleteInput name={'name'} value={row.name} />
                </TableCell>
                <TableCell>
                  <Controls.Input
                    width={'100px'}
                    type={'Number'}
                    name={'count'}
                    value={row.count}
                    onChange={(e) => handleInputs(index, e)}
                  />
                </TableCell>
                <TableCell>
                  <Typography>{row.brutto}</Typography>
                </TableCell>
                <TableCell>
                  <Controls.Input
                    name={'netto'}
                    value={row.netto}
                    onChange={(e) => handleInputs(index, e)}
                  />
                </TableCell>
                <TableCell>
                  <Typography>{row.price}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{row.summ}</Typography>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <DeleteSweepIcon onClick={() => handleRemoveTableRow(index)} />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <IconButton onClick={addNewRowHandleButton}>
          <Button variant={'contained'} color={'success'}>
            +
          </Button>
        </IconButton>
        <IconButton>
          <Button variant={'outlined'} color={'success'}>
            Добавить товары
          </Button>
        </IconButton>
      </MuiTable>
    </Box>
  );
}
