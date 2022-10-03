import { Button, Card, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import IncomeProductModal from './IncomeProductModal/IncomeProductModal';
import Layout from '../../components/Layout/Layout';
import ChartPerYear from '../../pages/Dashboard/Chart/ChartPerYear';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);

  return (
    <Layout>
      <ChartPerYear />
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
    </Layout>
  );
};

export default Dashboard;
