import { TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import React from 'react';

const DatePicker = (props) => {
  const { value, onChange, ...other } = props;

  return (
    <DesktopDatePicker
      inputFormat="DD/MM/YYYY"
      value={value}
      onChange={onChange}
      renderInput={(params) => (
        <TextField sx={{ display: 'inline-block' }} {...params} {...other} />
      )}
    />
  );
};

export default DatePicker;
