import { FC, useEffect, useState } from 'react';
import { addProduct } from 'features/ProductsPage/bll/middleware/products';
import { ProductType } from 'features/ProductsPage/bll/types';
import { ProductTypes } from 'features/ProductsPage/utils/constants';
import { CustomSelect } from 'shared/components/CustomSelect/CustomSelect';
import { ModalWrapper } from 'shared/components/ModalWrapper/ModalWrapper';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import { inSaleStatus } from 'types';
import { v4 as uuidv4 } from 'uuid';

import { Box, Button, DialogActions, Grid, TextField } from '@mui/material';

import { unitOptions } from './constants';

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
    dispatch(addProduct({ product: state }))
      .unwrap()
      .then(() => {
        setOpen(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setNewProductInTableRow(index, state);
  }, [products]);

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      modalTitle={'Добавить товар'}
      maxWidth="400px"
    >
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
          }}
        >
          <TextField
            label={'Наименование'}
            name={'name'}
            value={state.name}
            onChange={handleInputs}
            error={!state.name}
          />

          <CustomSelect
            label={'Категория'}
            name={'category'}
            value={state.category}
            onChange={handleInputs}
            menuItems={[{ id: '1', value: '--' }]}
          />

          <CustomSelect
            label={'Единица измерения'}
            name="unit"
            value={state.unit}
            onChange={handleInputs}
            menuItems={unitOptions}
          />

          {state.unit === 'шт.' ? (
            <TextField
              label={'Вес штуки'}
              name={'weight'}
              value={state.weight}
              onChange={handleInputs}
              InputProps={{
                endAdornment: 'гр.',
              }}
            />
          ) : null}

          <TextField
            label="Себестоимость"
            name={'price'}
            value={state.price}
            onChange={handleInputs}
            error={!state.price}
            InputProps={{
              endAdornment: '₴',
            }}
          />

          <TextField
            label="Mинимальный остаток"
            name={'minQuantity'}
            value={state.minQuantity}
            onChange={handleInputs}
            InputProps={{
              endAdornment: state.unit,
            }}
          />
        </Box>

        {/* button actions */}
        <DialogActions sx={{ marginTop: '50px' }}>
          <Button
            fullWidth
            onClick={handleCloseModal}
            variant="contained"
            color="inherit"
          >
            Отменить
          </Button>
          <Button
            fullWidth
            onClick={handleAddProduct}
            variant="contained"
            color="success"
          >
            Добавить
          </Button>
        </DialogActions>
      </Box>
    </ModalWrapper>
  );
};
