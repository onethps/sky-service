import React from 'react';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from '@mui/material';

interface CustomSelectProps extends SelectProps {
  menuItems: { id: string; value: string }[];
  label: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  menuItems,
  label,
  ...restProps
}) => {
  return (
    <FormControl>
      <InputLabel id={`simple-select-${label}`}>{label}</InputLabel>
      <Select
        labelId={`simple-select-${label}`}
        id="simple-select"
        label={label}
        {...restProps}
      >
        {menuItems.map((item) => {
          return (
            <MenuItem key={item.id} value={item.value}>
              {item.value}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
