import {
  Button,
  DialogActions,
  DialogTitle,
  Grid,
  SelectChangeEvent,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import React, { ChangeEvent, FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChooseWalletModal } from './ChooseWalletModal/ChooseWalletModal';
import { selectOptionsType } from '../../../components/types';
import { Form, Table, Controls } from '../../../components';
import { useDispatch } from 'react-redux';
import { updateProducts } from '../../../store/reducers/products';
import { ProductType } from '../../Products/types';
import {
  arrayOfWallet,
  optionsForSaleStatus,
  optionsForSpendCategory,
} from '../../../constants/constants';

type initIncomeType = {
  id: string;
  date: Dayjs | null;
  spendCategory: string | unknown;
  debitMoney: boolean;
};

const initFValues: initIncomeType = {
  id: uuidv4(),
  date: dayjs(),
  spendCategory: 'Приход товара',
  debitMoney: true,
};

type IncomeModalTypes = {
  open: boolean;
  setOpen: (b: boolean) => void;
};

export const initTableState: ProductType = {
  productId: uuidv4(),
  name: '',
  quantity: 0,
  unit: 'шт',
  price: 0,
  sum: 0,
  netPrice: 0,
  productType: 'one',
  category: '--',
  inSale: true,
  marginPrice: 0,
  minQuantity: 0,
  weight: '',
};

const IncomeProductModal: FC<IncomeModalTypes> = (props) => {
  const { open, setOpen } = props;
  const [state, setState] = useState<initIncomeType>({ ...initFValues });
  const [tableState, setTableState] = useState<ProductType[]>([{ ...initTableState }]);
  const [error, ,] = useState(false);

  console.log(tableState);

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
    setState({ ...state, debitMoney: e.currentTarget.checked });
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
    // console.log(tableState);
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
      <Controls.BasicModal
        open={open}
        setOpen={setOpen}
        modalTitle={'Новий прихід товару'}
      >
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

              {state.debitMoney ? (
                <Controls.Select
                  value={selectWalletValue}
                  options={selectWalletOptions}
                  onChange={handleSelectWalletValue}
                />
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
            </Form>
          </Grid>
        </Grid>
      </Controls.BasicModal>
    </>
  );
};

export default IncomeProductModal;
