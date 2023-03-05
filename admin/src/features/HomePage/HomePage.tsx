import Chart from 'react-apexcharts';

import { Box, Card, CardContent, Container, Stack, Typography } from '@mui/material';

import {
  linearChartOptions,
  pieChartOptions,
  splineChartOptions,
} from './constants/chart.options';

export const HomePage = () => {
  return (
    <Container>
      <Stack gap="50px">
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
