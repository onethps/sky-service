import React, { ChangeEvent, FC, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { updateProducts } from 'features/ProductsPage/bll/middleware/products';
import { ProductType } from 'features/ProductsPage/bll/types';
import { useDispatch } from 'react-redux';
import { ModalWrapper } from 'shared/components/ModalWrapper/ModalWrapper';
import { Table } from 'shared/components/NewProductModal/Table/Table';
import { selectOptionsType } from 'shared/components/types';
import { arrayOfWallet, optionsForSpendCategory } from 'utlis/constants/constants';
import { generateNewProductField } from 'utlis/helpers';
import { v4 as uuidv4 } from 'uuid';

import {
  Button,
  DialogActions,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DatePicker } from '../components/DatePicker';
import { TimePicker } from '../components/TimePicker';

import { ChooseWalletModal } from './ChooseWalletModal/ChooseWalletModal';

type initIncomeType = {
  id: string;
  date: Dayjs | null;
  spendCategory: string | unknown;
  debitMoney: string;
};

const initModalFields: initIncomeType = {
  id: uuidv4(),
  date: dayjs(),
  spendCategory: 'Приход товара',
  debitMoney: 'yes',
};

type IncomeModalTypes = {
  open: boolean;
  setOpen: (b: boolean) => void;
};

export const IncomeProductModal: FC<IncomeModalTypes> = (props) => {
  const { open, setOpen } = props;
  const [state, setState] = useState<initIncomeType>({ ...initModalFields });
  const [tableState, setTableState] = useState<ProductType[]>([
    generateNewProductField(),
  ]);
  const [error, ,] = useState(false);

  const dispatch = useDispatch();

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

  const handleSpendCategory = (event: SelectChangeEvent<string>) =>
    setState({ ...state, spendCategory: event.target.value });

  const handleDebitValue = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, debitMoney: e.target.value });
  };

  const [selectWalletOptions, setSelectWalletOptions] = useState<selectOptionsType[]>([
    ...arrayOfWallet,
  ]);

  const [selectWalletValue, setSelectWalletValue] = useState<string>(
    selectWalletOptions[0].title,
  );

  const handleSelectWalletValue = (event: SelectChangeEvent<string>) => {
    setSelectWalletValue(event.target.value);
  };

  const handleUpdateProducts = () => {
    dispatch(updateProducts({ products: tableState }) as any);
  };

  return (
    <>
      <ChooseWalletModal
        selectWalletValue={selectWalletValue}
        chooseWalletValue={selectWalletOptions[1].title}
        setSelectWalletValue={setSelectWalletValue}
        selectWalletOptions={selectWalletOptions}
        setSelectWalletOptions={setSelectWalletOptions}
      />
      <ModalWrapper open={open} setOpen={setOpen} modalTitle={'Новий прихід товару'}>
        <Grid container>
          <Grid item xs={6} md={12} xl={16}>
            <FormGroup onSubmit={handleSubmit}>
              <DialogTitle>Дата</DialogTitle>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker value={state.date} onChange={handleChangeData} />
                <TimePicker value={state.date} onChange={handleChangeData} />
              </LocalizationProvider>
              <DialogTitle>Категория трат</DialogTitle>
              <FormControl>
                <Select
                  name={'spendCategory'}
                  value={state.spendCategory as string}
                  onChange={handleSpendCategory}
                />
                {optionsForSpendCategory.map(({ id, title }) => (
                  <MenuItem key={id} value={title}>
                    {title}
                  </MenuItem>
                ))}
              </FormControl>

              <DialogTitle>Списать деньги</DialogTitle>
              <RadioGroup
                name={'debitMoney'}
                value={state.debitMoney}
                onChange={handleDebitValue}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Так" />
                <FormControlLabel value="no" control={<Radio />} label="Ні" />
              </RadioGroup>

              {state.debitMoney === 'yes' ? (
                <FormControl>
                  <Select value={selectWalletValue} onChange={handleSelectWalletValue} />
                  {selectWalletOptions.map(({ id, title }) => (
                    <MenuItem key={id} value={title}>
                      {title}
                    </MenuItem>
                  ))}
                </FormControl>
              ) : null}

              <Table state={tableState} setState={setTableState} />

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
                  onClick={handleUpdateProducts}
                  sx={{ display: 'flex', flexGrow: 1 }}
                  variant="contained"
                  color="success"
                >
                  Выполнить
                </Button>
              </DialogActions>
            </FormGroup>
          </Grid>
        </Grid>
      </ModalWrapper>
    </>
  );
};
