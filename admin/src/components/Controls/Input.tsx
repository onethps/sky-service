import React, { FC } from 'react';

import { Box, FormControl, InputAdornment, InputProps } from '@mui/material';
import { TextField } from '@mui/material';

interface InputPropsTypes extends InputProps {
  label?: string;
}

const Input: FC<InputPropsTypes> = (props) => {
  const { disabled, name, label, value, onChange, endAdornment, type, error } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      disabled={disabled}
      onChange={onChange}
      error={error}
      type={type}
      InputProps={{
        endAdornment: <InputAdornment position="start">{endAdornment}</InputAdornment>,
      }}
    />
  );
};

export default Input;
