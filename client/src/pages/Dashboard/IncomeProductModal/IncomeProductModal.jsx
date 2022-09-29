import AddBoxIcon from '@mui/icons-material/AddBox';
import { Box, Button, DialogActions, DialogTitle, Grid, IconButton } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import Controls from '../../../components/Controls';
import Form from '../../../components/Form/Form';
import Table from '../../../components/Table/Table';
import { v4 as uuidv4 } from 'uuid';

const optionsForSpendCategory = [{ id: 1, title: 'Приход товара' }];
const optionsForSaleStatus = [
  { id: uuidv4(), title: 'Да' },
  { id: uuidv4(), title: 'Нет' },
];

const initFValues = {
  date: dayjs(),
  spendCategory: 'Приход товара',
  debitMoney: null,
  table: [
    {
      id: uuidv4(),
      name: '',
      count: '',
      scale: 'kg',
      price: '',
      fullPrice: '',
      retailPrice: '',
    },
  ],
};

const IncomeProductModal = (props) => {
  const { open, setOpen } = props;

  const [state, setState] = useState(initFValues);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  const handleClose = () => {
    if (!state.debitMoney) {
      setError(true);
      return;
    }

    setOpen(false);
  };

  const handleChangeData = (newValue) => setState({ ...state, date: newValue });

  const handleAddTableInputs = () => {
    const newTableRow = {
      id: uuidv4(),
      name: '',
      count: '',
      scale: '',
      price: '',
      fullPrice: '',
      retailPrice: '',
    };
    setState({
      ...state,
      table: [...state.table, newTableRow],
    });
  };

  const handleSpendCategory = (e) =>
    setState({ ...state, spendCategory: e.currentTarget.value });

  const handleDebitValue = (e) => {
    setError(false);
    setState({ ...state, debitMoney: e.currentTarget.value });
  };

  return (
    <Controls.BasicModal open={open} setOpen={setOpen} modalTitle={'Новый приход'}>
      <Grid container>
        <Grid item xs={6} md={12}>
          <Form onSubmit={handleSubmit}>
            <DialogTitle>Дата</DialogTitle>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controls.DatePicker
                name={'date'}
                value={state.data}
                onChange={handleChangeData}
              />
              <Controls.TimePicker value={state.data} onChange={handleChangeData} />
            </LocalizationProvider>
            <DialogTitle>Категория трат</DialogTitle>

            <Controls.Select
              name={'spendCategory'}
              value={state.spendCategory}
              onChange={handleSpendCategory}
              options={optionsForSpendCategory}
            />

            <DialogTitle>Списать деньги</DialogTitle>
            <Controls.RadioGroup
              name={'debitMoney'}
              value={state.debitMoney}
              items={optionsForSaleStatus}
              onChange={handleDebitValue}
              error={error}
            />

            <DialogTitle>Список товаров</DialogTitle>
            <Box>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                onClick={handleAddTableInputs}
              >
                <AddBoxIcon />
              </IconButton>
            </Box>

            <Table state={state} setState={setState} />

            <DialogActions sx={{ display: 'flex', width: '100%' }}>
              <Button
                onClick={handleClose}
                sx={{ display: 'flex', flexGrow: 1 }}
                variant="contained"
                color="error"
              >
                Очистить
              </Button>
              <Button
                onClick={handleClose}
                sx={{ display: 'flex', flexGrow: 1 }}
                variant="contained"
                color="success"
              >
                Выполнить
              </Button>
            </DialogActions>
          </Form>
        </Grid>
      </Grid>
    </Controls.BasicModal>
  );
};

export default IncomeProductModal;
