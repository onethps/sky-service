import React, { useEffect, useState } from 'react';
import { useAppDispatch } from 'shared/hooks/redux-hooks';

import { Button, Card, Grid, Typography } from '@mui/material';

import { fetchProducts } from '../ProductsPage/bll/middleware/products';

import { SaleChart } from './ui/components/SaleChart';
import { IncomeProductModal } from './ui/IncomeProductModal/IncomeProductModal';

export const HomePage = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <SaleChart />
      <IncomeProductModal open={open} setOpen={setOpen} />

      <Grid item xs={12} md={8} lg={12}>
        <Card variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Создать документ
          </Typography>
          <Button variant="contained" onClick={handleClickOpen}>
            Приход товара
          </Button>
        </Card>
      </Grid>
    </>
  );
};
