import React, { FC } from 'react';
import { Dayjs } from 'dayjs';

import { TextField } from '@mui/material';
import { TimePicker as MuiTimePicker, TimePickerProps } from '@mui/x-date-pickers';

interface ITimePicker {
  value: Dayjs | null;
  onChange: (el: Dayjs | null) => void;
}

export const TimePicker: FC<ITimePicker> = (props) => {
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
