import React from 'react';

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from '@mui/material';

interface CustomRadioGroupProps extends RadioGroupProps {
  radioItems: { id: string; value: string; label: string }[];
  label?: string;
}

export const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
  radioItems,
  label,
  ...restProps
}) => {
  return (
    <FormControl>
      {label && <FormLabel id={`radio-buttons-group-${label}`}>{label}</FormLabel>}
      <RadioGroup row {...restProps} aria-labelledby={`radio-buttons-group-${label}`}>
        {radioItems.map((item) => {
          return (
            <FormControlLabel
              key={item.id}
              value={item.value}
              control={<Radio />}
              label={item.label}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};
