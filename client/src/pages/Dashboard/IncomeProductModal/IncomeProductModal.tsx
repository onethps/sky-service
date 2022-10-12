import AddBoxIcon from '@mui/icons-material/AddBox';
import {
  Box,
  Button,
  DialogActions,
  DialogTitle,
  Grid,
  IconButton,
  SelectChangeEvent,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import React, { ChangeEvent, FC, ReactNode, useState } from 'react';
import Controls from '../../../components/Controls';
import Form from '../../../components/Form/Form';
import { v4 as uuidv4 } from 'uuid';
import Table from 'components/Table/Table';

const optionsForSpendCategory = [{ id: 1, title: 'Приход товара' }];
const optionsForSaleStatus = [
  { id: 1, title: 'Да' },
  { id: 2, title: 'Нет' },
];

type initIncomeType = {
  id: string;
  date: Dayjs | null;
  spendCategory: string | unknown;
  debitMoney: string;
  table: TableType[];
};

type TableType = {
  id: string;
  name: string;
  count: string;
  scale: string;
  price: string;
  fullPrice: string;
  retailPrice: string;
};

const initFValues: initIncomeType = {
  id: uuidv4(),
  date: dayjs(),
  spendCategory: 'Приход товара',
  debitMoney: '',
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

type IncomeModalTypes = {
  open: boolean;
  setOpen: (b: boolean) => void;
};

const IncomeProductModal: FC<IncomeModalTypes> = (props) => {
  const { open, setOpen } = props;

  const [state, setState] = useState<initIncomeType>({ ...initFValues });

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleClose = () => {
    if (!state.debitMoney) {
      return;
    }
    setOpen(false);
  };

  const handleChangeData = (newValue: Dayjs | null) =>
    setState({ ...state, date: newValue });

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

  const [error, setError] = useState(false);

  const handleSpendCategory = (
    e: SelectChangeEvent<string | unknown>,
    child: ReactNode,
  ) => setState({ ...state, spendCategory: e.target.value });

  const handleDebitValue = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, debitMoney: e.currentTarget.value });
  };

  return (
    <Controls.BasicModal open={open} setOpen={setOpen} modalTitle={'Новый приход'}>
      <Grid container>
        <Grid item xs={6} md={12} xl={16}>
          <Form onSubmit={handleSubmit}>
            <DialogTitle>Дата</DialogTitle>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controls.DesktopDatePicker
                value={state.date}
                onChange={handleChangeData}
              />
              <Controls.TimePicker value={state.date} onChange={handleChangeData} />
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
              errorMessage={error}
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

            <Table />

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
