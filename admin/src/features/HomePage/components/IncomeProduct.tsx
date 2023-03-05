import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  debitMoneyOptions,
  optionsForSpendCategory,
} from 'features/HomePage/constants/constants';
import { updateProducts } from 'features/ProductsPage/bll/middleware/products';
import { IProduct } from 'interfaces/product.interfaces';
import { useFieldArray, useForm } from 'react-hook-form';
import { CustomRadioGroup } from 'shared/components/CustomRadioGroup/CustomRadioGroup';
import { CustomSelect } from 'shared/components/CustomSelect/CustomSelect';
import { ModalWrapper } from 'shared/components/ModalWrapper/ModalWrapper';
import { IncomeTable } from 'shared/components/NewProductModal/Table/IncomeTable';
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

import { DatePicker } from './DatePicker';
import { IncomeTable2 } from './IncomeTable2';
import { ProductItem } from './ProductItem';
import { TimePicker } from './TimePicker';
import { WalletOptions } from './WalletOptions';

export type BalanceType = {
  id: string;
  date: Dayjs | null;
  spendCategory: string | unknown;
  debitMoney: string;
};

const defaultValues: BalanceType = {
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

  const [state, setState] = React.useState<BalanceType>({
    ...defaultValues,
  });
  const [tableState, setTableState] = React.useState<IProduct[]>([
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

  const { handleSubmit, reset, control } = useForm({
    defaultValues: {
      products: [{ name: 'vino', count: '', price: '', sum: '', netPrice: '' }],
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });

  const onSubmit = (data: any) => console.log(data);

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

              <Typography fontWeight="500" variant="h6">
                Список товаров
              </Typography>

              {/* product list  */}
              <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((field, index) => (
                  <Stack key={field.id} flexDirection="row">
                    <ProductItem control={control} index={index} />
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => remove(index)}
                    >
                      X
                    </Button>
                  </Stack>
                ))}
                <Button
                  variant="contained"
                  sx={{
                    flexGrow: 0,
                    width: 50,
                  }}
                  onClick={() => {
                    append({ name: 'vino', count: '', price: '', sum: '', netPrice: '' });
                  }}
                >
                  +
                </Button>
                <input type="submit" />
              </form>
              {/* <IncomeTable2 productList={tableState} setProductList={setTableState} /> */}
              {/* <IncomeTable productList={tableState} setProductList={setTableState} /> */}

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
