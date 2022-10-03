import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import {
  Box,
  Button,
  IconButton,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import Controls from '../../../../components/Controls';

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

const Table = ({ state }) => {
  const handleInputs = (event, index) => {
    const value = state;
    value[index][event.target.name] = event.target.value;
    // setTechCard({
    //   ...state,
    //   value,
    // });
  };

  // const handleRemoveTableRow = (index) => {
  //   const values = state;
  //   values.splice(index, 1);
  //   console.log(values);
  //   setState([...values]);
  // };
  //

  return (
    <MuiTable sx={{ maxWidth: '400px' }}>
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
                <Controls.AutoCompleteInput
                  name={'name'}
                  value={row.name}
                  onChange={(e) => handleInputs(e, index)}
                />
              </TableCell>
              <TableCell>
                <Controls.Input
                  minWidth={'50px'}
                  maxWidth={'80px'}
                  type={'Number'}
                  name={'count'}
                  value={row.count}
                />
              </TableCell>
              <TableCell>
                <Typography>{row.brutto}</Typography>
              </TableCell>
              <TableCell>
                <Controls.Input
                  minWidth={'50px'}
                  maxWidth={'80px'}
                  name={'netto'}
                  value={row.netto}
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
                  <DeleteSweepIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <Box name={'buttonsAddRow'}>
        <IconButton>
          <Button variant={'contained'} color={'success'}>
            +
          </Button>
        </IconButton>
        <IconButton>
          <Button variant={'outlined'} color={'success'}>
            Добавить товары
          </Button>
        </IconButton>
      </Box>
    </MuiTable>
  );
};

export default Table;
