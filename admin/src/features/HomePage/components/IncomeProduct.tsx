import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  debitMoneyOptions,
  optionsForSpendCategory,
} from 'features/HomePage/constants/constants';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { CustomRadioGroup } from 'shared/components/CustomRadioGroup/CustomRadioGroup';
import { CustomSelect } from 'shared/components/CustomSelect/CustomSelect';
import { ModalWrapper } from 'shared/components/ModalWrapper/ModalWrapper';
import { useAppDispatch } from 'shared/hooks/redux-hooks';

import {
  Box,
  Button,
  DialogActions,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker as MuiDesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { ProductItem } from './ProductItem';
import { WalletOptions } from './WalletOptions';

export type BalanceType = {
  id: string;
  date: Dayjs | null;
  spendCategory: string | unknown;
  debitMoney: string;
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
  const [wallet, setWallet] = useState('Нет');

  const { handleSubmit, control, watch, setValue } = useForm({
    defaultValues: {
      date: dayjs(),
      time: dayjs(),
      spendCategory: '',
      debitMoney: 'yes',
      products: [{ name: '', quantity: '', price: '', sum: '', netPrice: '' }],
    },
    mode: 'onChange',
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'products',
  });

  const watchWalletInputOption = watch('debitMoney');

  const onSubmit = (data: any) => console.log(data);

  return (
    <ModalWrapper open={open} setOpen={setOpen} modalTitle={'Новый приход товара'}>
      <Grid container>
        <Grid item xs={6} md={12} xl={16}>
          <form id="income-product-form-id" onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="column" gap="20px">
              {/* date */}
              <Stack gap="10px">
                <Typography fontWeight="500" variant="h6">
                  Дата
                </Typography>
                <Stack flexDirection="row" gap="15px">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                      name={`date`}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <MuiDesktopDatePicker
                          inputFormat="DD/MM/YYYY"
                          value={value}
                          onChange={onChange}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      )}
                    />
                    <Controller
                      name={`time`}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <MuiTimePicker
                          value={value}
                          onChange={onChange}
                          renderInput={(params) => (
                            <TextField variant={'outlined'} {...params} />
                          )}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Stack>
              </Stack>

              {/* spending category */}
              <Stack gap="10px">
                <Typography fontWeight="500" variant="h6">
                  Категория трат
                </Typography>
                <Controller
                  name={`spendCategory`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CustomSelect
                      sx={{
                        maxWidth: 245,
                      }}
                      value={value}
                      onChange={onChange}
                      menuItems={optionsForSpendCategory}
                    />
                  )}
                />
              </Stack>

              {/* balance option */}
              <Stack gap="10px">
                <Typography fontWeight="500" variant="h6">
                  Списать деньги
                </Typography>
                <Controller
                  name={`debitMoney`}
                  control={control}
                  defaultValue={'yes'}
                  render={({ field: { onChange, value } }) => (
                    <CustomRadioGroup
                      value={value}
                      onChange={onChange}
                      radioItems={debitMoneyOptions}
                    />
                  )}
                />
              </Stack>

              {/* wallet flow */}

              <WalletOptions
                wallet={wallet}
                setWallet={setWallet}
                isShowedWalletInput={watchWalletInputOption === 'yes'}
              />

              <Typography fontWeight="500" variant="h6">
                Список товаров
              </Typography>

              {/* product list  */}

              <Box display="flex" gap={3} flexDirection="column">
                {fields.map((field, index) => (
                  <Stack key={field.id} flexDirection="row">
                    <ProductItem
                      control={control}
                      watch={watch}
                      setValue={setValue}
                      index={index}
                      updateInputs={update}
                    />
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => remove(index)}
                    >
                      X
                    </Button>
                  </Stack>
                ))}
              </Box>
              <Button
                variant="contained"
                sx={{
                  flexGrow: 0,
                  width: 50,
                }}
                onClick={() => {
                  append({
                    name: '',
                    quantity: '',
                    price: '',
                    sum: '',
                    netPrice: '',
                  });
                }}
              >
                +
              </Button>

              {/* buttons */}
              <DialogActions sx={{ display: 'flex', width: '100%' }}>
                <Button
                  fullWidth
                  onClick={() => console.log('CLEARED')}
                  sx={{ display: 'flex', flexGrow: 1 }}
                  variant="contained"
                  color="error"
                >
                  Очистить
                </Button>
                <Button
                  type="submit"
                  form="income-product-form-id"
                  fullWidth
                  variant="contained"
                  color="success"
                >
                  Выполнить
                </Button>
              </DialogActions>
            </Box>
          </form>
        </Grid>
      </Grid>
    </ModalWrapper>
  );
};
