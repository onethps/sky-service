import React, { FC } from 'react';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
  SelectProps,
} from '@mui/material';

type optionsType = {
  id: number;
  title: string;
};

type SelectTypes = {
  options: optionsType[];
  minWidth?: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  name?: string;
  label?: string;
  value: any;
  error?: boolean;
  type?: string;
  disabled?: boolean;
  style?: any;
};

const Select: FC<SelectTypes> = (props) => {
  const {
    name,
    label,
    style,
    value,
    error = null,
    onChange,
    options,
    type,
    disabled,
  } = props;
  return (
    <FormControl variant="outlined" sx={{ width: '100%' }}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        sx={{ ...style }}
        disabled={disabled}
        label={label}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      >
        {options.map((item) => (
          <MenuItem key={item.id} value={item.title}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default Select;
