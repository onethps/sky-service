import { Card, CardHeader, Divider, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import Chart from 'react-apexcharts';

const ChartPerYear = () => {
  const chartData = [
    {
      name: 'Past Referrals',
      type: 'column',
      data: [1008, 940, 1010, 821, 1035, 1030, 957, 926, 993, 1021, 997, 879],
    },
    {
      name: 'Current Referrals',
      type: 'line',
      data: [648, 745, 897, 743, 635, 842, 811, 696, 878, 987, 747, 731],
    },
  ];

  const chartOptions: any = {
    stroke: {
      curve: 'smooth',
      width: [0, 5],
    },
    theme: {
      mode: '#57CA22',
    },
    chart: {
      background: 'transparent',
      toolbar: {
        show: false,
      },
    },
    markers: {
      hover: {
        sizeOffset: 2,
      },
      shape: 'circle',
      size: 6,
      strokeWidth: 3,
      strokeOpacity: 1,
      strokeColors: '#fff',
      colors: ['#33C2FF'],
    },
    colors: ['#33C2FF', '#223354'],
    fill: {
      opacity: 1,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 8,
        columnWidth: '25%',
      },
    },
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    dataLabels: {
      enabled: false,
    },
    grid: {
      strokeDashArray: 5,
      borderColor: '#000',
    },
    legend: {
      show: false,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: '#57CA22',
        },
      },
    },
    yaxis: {
      tickAmount: 6,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: '#57CA22',
        },
      },
    },
  };

  return (
    <Grid item xs={12} md={8} lg={12}>
      <Card variant="outlined" sx={{ my: { xs: 3, md: 1 }, p: { xs: 2, md: 3 } }}>
        <CardHeader title={'Статистика продаж'} />
        <Divider />
        <Chart options={chartOptions} series={chartData} type="line" height={306} />
      </Card>
    </Grid>
  );
};

export default ChartPerYear;
