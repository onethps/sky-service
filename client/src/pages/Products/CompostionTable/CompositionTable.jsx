import {
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
];

const initState = {
  id: 1,
  name: '',
  count: null,
  brutto: 0,
  netto: 0,
  price: 0,
  summ: 0.0,
};

export default function CompositionTable() {
  const [state, setState] = useState([
    {
      ...initState,
    },
  ]);

  const handleInputs = (index, event) => {
    const value = state;
    value[index][event.target.name] = event.target.value;
    setState({
      ...state,
      value,
    });
  };

  const handleRemoveTableRow = (index) => {
    const values = state.table;
    values.splice(index, 1);
    setState({
      ...state,
      values,
    });
  };

  return (
    <MuiTable>
      <TableHead>
        <TableRow>
          {categories.map((headText) => (
            <TableCell align="left">{headText.title}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {state.map((row, index) => {
          return (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <Controls.AutoCompleteInput name={'name'} value={row.name} />
              </TableCell>
              <TableCell>
                <Controls.Input
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
                <IconButton color="primary" aria-label="upload picture" component="label">
                  <DeleteSweepIcon onClick={() => handleRemoveTableRow(index)} />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </MuiTable>
  );
}
