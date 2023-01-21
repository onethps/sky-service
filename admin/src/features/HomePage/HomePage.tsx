import React, { useEffect, useState } from 'react';
import { useAppDispatch } from 'shared/hooks/redux-hooks';

import { Button, Card, CardContent, Grid, Typography } from '@mui/material';

import { fetchProducts } from '../ProductsPage/bll/middleware/products';

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
      <IncomeProductModal open={open} setOpen={setOpen} />
      <Grid item xs={12} md={8} lg={12}>
        <Typography
          textAlign="left"
          component="h1"
          variant="h4"
          align="center"
          marginBottom="20px"
        >
          Создать документ
        </Typography>
        <Card variant="outlined">
          <CardContent>
            <Button variant="contained" onClick={handleClickOpen}>
              Приход товара
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};
