import { FC, useEffect, useState } from 'react';
import { unitOptions } from 'features/HomePage/constants/constants';
import { addProduct } from 'features/ProductsPage/bll/middleware/products';
import { IProduct } from 'interfaces/product.interfaces';
import { CustomSelect } from 'shared/components/CustomSelect/CustomSelect';
import { ModalWrapper } from 'shared/components/ModalWrapper/ModalWrapper';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';
import { generateNewProductField } from 'utlis/helpers';
import { v4 as uuidv4 } from 'uuid';

import { Box, Button, DialogActions, TextField } from '@mui/material';

type NewProductModalType = {
  open: boolean;
  setOpen: (value: boolean) => void;
  index: number;
  setNewProductInTableRow: (index: number, newProduct: IProduct) => void;
};

export const NewProductModal: FC<NewProductModalType> = ({
  open,
  setOpen,
  index,
  setNewProductInTableRow,
}) => {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.products.products);

  const [product, setProduct] = useState<IProduct>(generateNewProductField());

  const handleInputs = (event: any) => {
    setProduct({
      ...product,
      id: uuidv4(),
      [event.target.name]: Number(event.target.value)
        ? +event.target.value
        : event.target.value,
    });
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleAddProduct = () => {
    if (product.name === '' || product.price === 0) {
      return;
    }
    dispatch(addProduct({ product }))
      .unwrap()
      .then(() => {
        setOpen(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setNewProductInTableRow(index, product);
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
            value={product.name}
            onChange={handleInputs}
            error={!product.name}
          />

          <CustomSelect
            label={'Категория'}
            name={'category'}
            value={product.category}
            onChange={handleInputs}
            menuItems={[{ id: '1', value: '--' }]}
          />

          <CustomSelect
            label={'Единица измерения'}
            name="unit"
            value={product.unit}
            onChange={handleInputs}
            menuItems={unitOptions}
          />

          {product.unit === 'шт' ? (
            <TextField
              variant="outlined"
              label={'Вес штуки'}
              name={'weight'}
              value={product.weight}
              onChange={handleInputs}
              InputProps={{
                endAdornment: 'гр.',
              }}
            />
          ) : null}

          <TextField
            label="Себестоимость"
            name={'price'}
            value={product.price}
            onChange={handleInputs}
            error={!product.price}
            InputProps={{
              endAdornment: '₴',
            }}
          />

          <TextField
            label="Mинимальный остаток"
            name={'minQuantity'}
            value={product.minQuantity}
            onChange={handleInputs}
            InputProps={{
              endAdornment: product.unit,
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
