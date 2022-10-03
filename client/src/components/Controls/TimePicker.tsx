import { TextField } from '@mui/material';
import { TimePicker as MuiTimePicker, TimePickerProps } from '@mui/x-date-pickers';
import React, { FC } from 'react';
import { Dayjs } from 'dayjs';

type TimePickerType = {
  value: Dayjs | null;
  onChange: (el: Dayjs | null) => void;
};

const TimePicker: FC<TimePickerType> = (props) => {
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
