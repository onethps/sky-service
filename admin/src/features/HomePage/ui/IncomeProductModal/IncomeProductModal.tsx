import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { updateProducts } from 'features/ProductsPage/bll/middleware/products';
import { ProductType } from 'features/ProductsPage/bll/types';
import { CustomRadioGroup } from 'shared/components/CustomRadioGroup/CustomRadioGroup';
import { CustomSelect } from 'shared/components/CustomSelect/CustomSelect';
import { ModalWrapper } from 'shared/components/ModalWrapper/ModalWrapper';
import { Table } from 'shared/components/NewProductModal/Table/Table';
import { useAppDispatch } from 'shared/hooks/redux-hooks';
import { generateNewProductField } from 'utlis/helpers';
import { v4 as uuidv4 } from 'uuid';

import {
  Box,
  Button,
  DialogActions,
  FormGroup,
  Grid,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DatePicker } from '../components/DatePicker';
import { TimePicker } from '../components/TimePicker';

import { debitMoneyOptions, optionsForSpendCategory } from './NewProductModal/constants';
import { WalletOptions } from './WalletOptions/WalletOptions';

export type InitIncomeBalanceType = {
  id: string;
  date: Dayjs | null;
  spendCategory: string | unknown;
  debitMoney: string;
};

const initModalFields: InitIncomeBalanceType = {
  id: uuidv4(),
  date: dayjs(),
  spendCategory: 'Приход товара',
  debitMoney: 'yes',
};

interface IncomeProductModalProps {
  open: boolean;
  setOpen: (v: boolean) => void;
}

export const IncomeProductModal: React.FC<IncomeProductModalProps> = ({
  open,
  setOpen,
}) => {
  const dispatch = useAppDispatch();

  const [state, setState] = React.useState<InitIncomeBalanceType>({ ...initModalFields });
  const [tableState, setTableState] = React.useState<ProductType[]>([
    generateNewProductField(),
  ]);

  const handleUpdateProducts = () => {
    dispatch(updateProducts({ products: tableState }));
    setOpen(false);
  };

  const handleClose = () => {
    if (!state.debitMoney) {
      return;
    }
    setOpen(false);
  };

  const handleChangeData = (newValue: Dayjs | null) =>
    setState({ ...state, date: newValue });

  const handleSpendCategory = (event: SelectChangeEvent<unknown>) =>
    setState({ ...state, spendCategory: event.target.value });

  const handleDebitMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, debitMoney: e.target.value });
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen} modalTitle={'Новый приход товара'}>
      <Grid container>
        <Grid item xs={6} md={12} xl={16}>
          <FormGroup>
            <Box display="flex" flexDirection="column" gap="20px">
              {/* date */}
              <Stack gap="10px">
                <Typography fontWeight="500" variant="h6">
                  Дата
                </Typography>
                <Stack flexDirection="row" gap="15px">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker value={state.date} onChange={handleChangeData} />
                    <TimePicker value={state.date} onChange={handleChangeData} />
                  </LocalizationProvider>
                </Stack>
              </Stack>

              {/* spending category */}
              <Stack gap="10px">
                <Typography fontWeight="500" variant="h6">
                  Категория трат
                </Typography>
                <CustomSelect
                  name={'spendCategory'}
                  value={state.spendCategory as string}
                  onChange={handleSpendCategory}
                  menuItems={optionsForSpendCategory}
                />
              </Stack>

              {/* balance option */}
              <Stack gap="10px">
                <Typography fontWeight="500" variant="h6">
                  Списать деньги
                </Typography>
                <CustomRadioGroup
                  value={state.debitMoney}
                  onChange={handleDebitMoney}
                  radioItems={debitMoneyOptions}
                />
              </Stack>

              {/* wallet flow */}
              <WalletOptions state={state} />

              {/* techcard table */}
              <Table state={tableState} setState={setTableState} />

              {/* buttons */}
              <DialogActions sx={{ display: 'flex', width: '100%' }}>
                <Button
                  fullWidth
                  onClick={handleClose}
                  sx={{ display: 'flex', flexGrow: 1 }}
                  variant="contained"
                  color="error"
                >
                  Очистить
                </Button>
                <Button
                  fullWidth
                  onClick={handleUpdateProducts}
                  variant="contained"
                  color="success"
                >
                  Выполнить
                </Button>
              </DialogActions>
            </Box>
          </FormGroup>
        </Grid>
      </Grid>
    </ModalWrapper>
  );
};
