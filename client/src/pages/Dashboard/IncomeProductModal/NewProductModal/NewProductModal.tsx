import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Box, Button, DialogActions, Grid, SelectChangeEvent } from '@mui/material';
import { Controls } from '../../../../components';
import { addProduct } from '../../../../store/slices/products';
import { ProductType } from '../../../Products/types';
import { selectProducts } from '../../../Products/selectors';
import { v4 as uuidv4 } from 'uuid';
import { unitValues } from '../../../Products/EditProductModal/costants';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks';

type NewProductModalType = {
  open: boolean;
  setOpen: (value: boolean) => void;
  index: number;
  setNewProductInTableRow: (index: number, newProduct: ProductType) => void;
};

export const NewProductModal: FC<NewProductModalType> = ({
  open,
  setOpen,
  index,
  setNewProductInTableRow,
}) => {
  const dispatch = useAppDispatch();

  const { products } = useAppSelector(selectProducts);

  const [state, setState] = useState<ProductType>({
    productId: uuidv4(),
    name: '',
    productType: 'one',
    category: '--',
    inSale: true,
    netPrice: 0,
    marginPrice: 0,
    price: 0,
    quantity: 1,
    unit: 'шт',
    minQuantity: 0,
    weight: '',
    mod: [],
  });

  const handleInputs = (event: ChangeEvent<any>) => {
    setState({
      ...state,
      [event.target.name]: Number(event.target.value)
        ? +event.target.value
        : event.target.value,
    });
  };

  const handleSelects = (event: SelectChangeEvent<string>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
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
    <Controls.BasicModal
      open={open}
      setOpen={setOpen}
      modalTitle={'Додати товар'}
      maxWidth={'400px'}
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
            <Controls.Input
              label={'Найменування'}
              name={'name'}
              value={state.name}
              onChange={handleInputs}
              error={!state.name}
            />
            <Controls.Select
              label={'Категорія'}
              name={'category'}
              value={state.category}
              onChange={handleSelects}
              options={[{ id: 1, title: '--' }]}
            />
            <Controls.Select
              label={'Одиниця виміру'}
              name={'unit'}
              value={state.unit}
              onChange={handleSelects}
              options={unitValues}
            />
            {state.unit === 'шт.' ? (
              <Controls.Input
                label={'Вага штуки'}
                name={'weight'}
                value={state.weight || ''}
                onChange={handleInputs}
                endAdornment={'гр.'}
              />
            ) : null}

            <Controls.Input
              label={'Собівартість'}
              name={'price'}
              value={state.price}
              onChange={handleInputs}
              error={!state.price}
              endAdornment={'₴'}
            />
            <Controls.Input
              label={'Мінімальний залишок'}
              name={'minQuantity'}
              value={state.minQuantity}
              onChange={handleInputs}
              endAdornment={state.unit}
            />
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
    </Controls.BasicModal>
  );
};
