import { TextField } from '@mui/material';
import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers';
import React from 'react';

const TimePicker = (props) => {
  const { value, onChange } = props;

  return (
    <MuiTimePicker
      value={value}
      onChange={onChange}
      renderInput={(params) => (
        <TextField sx={{ display: 'inline-block' }} variant={'outlined'} {...params} />
      )}
    />
  );
};

export default TimePicker;
