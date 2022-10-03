import { TextField } from '@mui/material';
import {
  DesktopDatePicker as MuiDesktopDatePicker,
  DesktopDatePickerProps,
} from '@mui/x-date-pickers/DesktopDatePicker';
import React, { FC } from 'react';
import { Dayjs } from 'dayjs';

type DesktopDateType = {
  value: Dayjs | null;
  onChange: (el: Dayjs | null) => void;
};

const DesktopDatePicker: FC<DesktopDateType> = (props) => {
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

export default DesktopDatePicker;
