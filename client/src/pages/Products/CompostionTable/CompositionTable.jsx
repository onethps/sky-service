import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Controls from '../../../components/Controls';

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

const optionsPriceFor = [
  { id: 1, title: 'Порцию' },
  { id: 2, title: 'за 100гр.' },
  { id: 3, title: 'за 100мл.' },
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

export default function CompositionTable({
  initIngredients,
  removeIngredientsTable,
  id,
}) {
  const [state, setState] = useState([
    {
      ...initIngredients.ingredients,
    },
  ]);

  const [priceForOption, setPriceForOption] = useState(optionsPriceFor[0].title);

  const handleInputs = (index, event) => {
    const value = state;
    value[index][event.target.name] = event.target.value;
    setState({
      ...state,
      value,
    });
  };
  const handleRemoveTableRow = (index) => {
    const values = state;

    values.splice(index, 1);
    console.log(values);
    setState([...values]);
  };

  const handleChangePriceForOption = (e) => {
    setPriceForOption(e.currentTarget.value);
  };

  const addNewRowHandleButton = () => {
    setState([...state, { ...initState, id: uuidv4() }]);
  };

  return (
    <Box sx={{ bgcolor: greyBg, padding: 4 }}>
      <Controls.AutoCompleteInput />
      <Typography variant={'h5'} sx={{ fontWeight: '700', padding: '15px 0' }}>
        Состав
      </Typography>
      <Divider sx={{ m: '20px 0' }} />
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
                  <Controls.AutoCompleteInput name={'name'} value={row.name} />
                </TableCell>
                <TableCell>
                  <Controls.Input
                    minWidth={'50px'}
                    maxWidth={'80px'}
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
                    minWidth={'50px'}
                    maxWidth={'80px'}
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
      </MuiTable>
      <Box name={'buttonsAddRow'}>
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
      </Box>
      <Box
        name={'calculate netValue'}
        sx={{
          margin: '30px 0',
          alignItems: 'center',
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
        }}
      >
        <Controls.Select
          minWidth={'45%'}
          type={'Number'}
          label={'Цена за'}
          value={priceForOption}
          onChange={handleChangePriceForOption}
          options={optionsPriceFor}
        />
        <Controls.Input
          minWidth={'45%'}
          disabled
          label={'Себестоимость'}
          value={'0 / порцию'}
        />
      </Box>
      <Box
        component={'form'}
        autoComplete="off"
        name={'calculateMarginPrice'}
        sx={{
          maxWidth: '100%',
          bgcolor: '#e3f2fd',
          padding: '10px',
          gap: '10px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Controls.Input
          label={'Цена'}
          minWidth={'45%'}
          endAdornment={'₴'}
          value={initIngredients.price}
        />
        <Controls.Input
          label={'Наценка'}
          minWidth={'45%'}
          endAdornment={'%'}
          value={initIngredients.marginPricePercent}
        />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <IconButton>
          <Button
            onClick={() => removeIngredientsTable(id)}
            variant={'contained'}
            color={'error'}
          >
            Удалить
          </Button>
        </IconButton>
        <IconButton sx={{ display: 'block' }}>
          <Button variant={'outlined'} color={'info'}>
            Копировать
          </Button>
        </IconButton>
      </Box>
    </Box>
  );
}
