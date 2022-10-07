import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
  CheckboxProps,
} from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';

interface CheckBox extends CheckboxProps {
  label: string;
}

const Checkbox: FC<CheckBox> = ({ name, label, value, onChange, checked }) => {
  return (
    <FormControlLabel
      name={name}
      control={<MuiCheckbox value={value} checked={checked} onChange={onChange} />}
      label={label}
    />
  );
};

export default Checkbox;
