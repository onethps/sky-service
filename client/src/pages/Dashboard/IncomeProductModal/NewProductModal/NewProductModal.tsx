import React, { FC, useEffect, useState } from 'react';
import { Box, Button, DialogActions, Grid } from '@mui/material';
import { Controls } from '../../../../components';
import { addProduct } from '../../../../store/reducers/products';
import { useDispatch, useSelector } from 'react-redux';
import { ProductType } from '../../../Products/types';
import { selectProducts } from '../../../Products/selectors';

type NewProductModalType = {
  open: boolean;
  setOpen: (value: boolean) => void;
  index: number;
  handleSetProductDataAfterFetching: (index: number, newProduct: ProductType) => void;
};

export const NewProductModal: FC<NewProductModalType> = ({
  open,
  setOpen,
  index,
  handleSetProductDataAfterFetching,
}) => {
  const dispatch = useDispatch();

  const { products } = useSelector(selectProducts);

  const [state, setState] = useState<ProductType>({
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
  });

  console.log('state', state);

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
    dispatch(addProduct({ product: state }) as any);
    setOpen(false);
  };

  useEffect(() => {
    handleSetProductDataAfterFetching(index, state);
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
              onChange={handleInputs}
              options={[{ id: 1, title: '--' }]}
            />
            <Controls.Select
              label={'Одиниця виміру'}
              name={'unit'}
              value={state.unit}
              onChange={handleInputs}
              options={[
                { id: 1, title: 'kg' },
                { id: 2, title: 'шт.' },
              ]}
            />
            {state.unit === 'шт.' ? (
              <Controls.Input
                label={'Вага штуки'}
                name={'weight'}
                value={state.weight}
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
