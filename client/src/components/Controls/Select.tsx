import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectProps,
} from '@mui/material';
import React, { FC } from 'react';

interface SelectTypes extends SelectProps {
  options: any[];
  minWidth?: string;
}

const Select: FC<SelectTypes> = (props) => {
  const { name, label, value, error = null, onChange, options, minWidth } = props;
  return (
    <FormControl variant="outlined" sx={{ width: '100%' }}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
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
