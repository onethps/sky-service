import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useAppDispatch } from 'shared/hooks/redux-hooks';

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import { fetchProducts } from '../ProductsPage/bll/middleware/products';

import {
  linearChartOptions,
  pieChartOptions,
  splineChartOptions,
} from './constants/chart.options';
import { IncomeProductModal } from './ui/IncomeProductModal/IncomeProductModal';

export const HomePage = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <Container>
      <Stack gap="50px">
        <IncomeProductModal open={open} setOpen={setOpen} />
        {/* actions */}
        <Box>
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
        </Box>

        {/* sales chart  */}
        <Box>
          <Typography
            textAlign="left"
            component="h1"
            variant="h4"
            align="center"
            marginBottom="20px"
          >
            Продажи
          </Typography>
          <Card>
            <CardContent
              sx={{
                minHeight: 300,
              }}
            >
              <Chart
                options={linearChartOptions}
                series={linearChartOptions.series}
                type="bar"
                height="100%"
              />
            </CardContent>
          </Card>
          {/* pie charts */}
        </Box>
        <Box>
          <Typography
            textAlign="left"
            component="h1"
            variant="h4"
            align="center"
            marginBottom="20px"
          >
            Статистика
          </Typography>
          <Stack display="flex" flexDirection="row" gap="20px">
            <Card
              sx={{
                flex: 1,
              }}
            >
              <CardContent>
                <Chart
                  type="donut"
                  options={pieChartOptions}
                  series={pieChartOptions.series}
                  height="100%"
                />
              </CardContent>
            </Card>
            <Card
              sx={{
                flex: 1,
              }}
            >
              <CardContent>
                <Chart
                  type="area"
                  options={splineChartOptions}
                  series={splineChartOptions.series}
                  height="100%"
                />
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};
