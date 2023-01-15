import React, { FC } from 'react';
import { Dayjs } from 'dayjs';

import { TextField } from '@mui/material';
import { DesktopDatePicker as MuiDesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

interface IDesktopDateProps {
  value: Dayjs | null;
  onChange: (el: Dayjs | null) => void;
}

export const DatePicker: FC<IDesktopDateProps> = (props) => {
  const { value, onChange, ...other } = props;

  return (
    <MuiDesktopDatePicker
      {...other}
      inputFormat="DD/MM/YYYY"
      value={value}
      onChange={onChange}
      renderInput={(params) => <TextField sx={{ display: 'inline-block' }} {...params} />}
    />
  );
};
