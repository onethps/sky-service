import React, { FC, useEffect, useState } from 'react';
import { addProduct } from 'features/ProductsPage/bll/middleware/products';
import { ProductType } from 'features/ProductsPage/bll/types';
import { ProductTypes } from 'features/ProductsPage/utils/constants';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { ModalWrapper } from 'shared/components/ModalWrapper/ModalWrapper';
import { inSaleStatus } from 'types';
import { v4 as uuidv4 } from 'uuid';

import {
  Box,
  Button,
  DialogActions,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

type NewProductModalType = {
  open: boolean;
  setOpen: (value: boolean) => void;
  index: number;
  setNewProductInTableRow: (index: number, newProduct: ProductType) => void;
};

const generateNewProductFields = () => {
  return {
    productId: uuidv4(),
    name: '',
    productType: 'one' as ProductTypes,
    category: '--',
    inSale: 'yes' as inSaleStatus,
    netPrice: 0,
    marginPrice: 0,
    price: 0,
    quantity: 1,
    unit: 'шт',
    minQuantity: 0,
    weight: '',
    mod: [],
  };
};

export const NewProductModal: FC<NewProductModalType> = ({
  open,
  setOpen,
  index,
  setNewProductInTableRow,
}) => {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.products.products);

  const [state, setState] = useState<ProductType>(generateNewProductFields());

  const handleInputs = (event: any) => {
    setState({
      ...state,
      [event.target.name]: Number(event.target.value)
        ? +event.target.value
        : event.target.value,
    });
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleAddProduct = () => {
    if (state.name === '' || state.price === 0) {
      return;
    }
    dispatch(addProduct({ product: state }));
    setOpen(false);
  };

  useEffect(() => {
    setNewProductInTableRow(index, state);
  }, [products]);

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      modalTitle={'Додати товар'}
      maxWidth="400px"
    >
      <Grid container>
        <Grid item xs={6} md={12} xl={16}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '30px',
              marginBottom: '50px',
            }}
          >
            <TextField
              label={'Найменування'}
              name={'name'}
              value={state.name}
              onChange={handleInputs}
              error={!state.name}
            />

            <FormControl>
              <Select
                label={'Категорія'}
                name={'category'}
                value={state.category}
                onChange={handleInputs}
              >
                <MenuItem value={1}>--</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <Select
                label={'Одиниця виміру'}
                name={'unit'}
                value={state.unit}
                onChange={handleInputs}
              >
                <MenuItem value="kg">kg</MenuItem>
                <MenuItem value="шт">шт.</MenuItem>
              </Select>
            </FormControl>

            {state.unit === 'шт.' ? (
              <FormControl>
                <InputLabel>Вага штуки</InputLabel>
                <Input
                  name={'weight'}
                  value={state.weight}
                  onChange={handleInputs}
                  endAdornment={'гр.'}
                />
              </FormControl>
            ) : null}

            <FormControl>
              <InputLabel>Собівартість</InputLabel>
              <Input
                name={'price'}
                value={state.price}
                onChange={handleInputs}
                error={!state.price}
                endAdornment={'₴'}
              />
            </FormControl>

            <FormControl>
              <InputLabel>Мінімальний залишок</InputLabel>
              <Input
                name={'minQuantity'}
                value={state.minQuantity}
                onChange={handleInputs}
                endAdornment={state.unit}
              />
            </FormControl>
          </Box>
          <DialogActions sx={{ display: 'flex', width: '100%' }}>
            <Button
              onClick={handleCloseModal}
              sx={{ display: 'flex', flexGrow: 1 }}
              variant="contained"
              color="inherit"
            >
              Скасувати
            </Button>
            <Button
              onClick={handleAddProduct}
              sx={{ display: 'flex', flexGrow: 1 }}
              variant="contained"
              color="success"
            >
              Створити
            </Button>
          </DialogActions>
        </Grid>
      </Grid>
    </ModalWrapper>
  );
};
