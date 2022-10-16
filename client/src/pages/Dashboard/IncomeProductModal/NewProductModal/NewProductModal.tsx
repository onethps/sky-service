import React, { FC, useState } from 'react';
import { Box, Button, DialogActions, Grid } from '@mui/material';
import { Controls } from '../../../../components';

type NewProductModalType = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const NewProductModal: FC<NewProductModalType> = ({ open, setOpen }) => {
  const [productName, setProductName] = useState('');
  const [unitValue, setUnitValue] = useState('kg');

  const handleProductName = (event: any) => {
    setProductName(event.target.value);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

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
              value={productName}
              onChange={handleProductName}
            />
            <Controls.Input
              label={'Категорія'}
              name={'category'}
              value={productName}
              onChange={handleProductName}
            />
            <Controls.Select
              label={'Одиниця виміру'}
              name={'unit'}
              value={unitValue}
              onChange={(event) => setUnitValue(event.target.value)}
              options={[{ id: 1, title: 'kg' }]}
            />
            {productName === 'шт.' ? (
              <Controls.Input
                label={'Вага штуки'}
                name={'weight'}
                value={productName}
                onChange={handleProductName}
              />
            ) : null}

            <Controls.Input
              label={'Собівартість'}
              name={'netPrice'}
              value={productName}
              onChange={handleProductName}
            />
            <Controls.Input
              label={'Мінімальний залишок'}
              name={'minQuantity'}
              value={productName}
              onChange={handleProductName}
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
