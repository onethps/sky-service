import { Box, FormControl, InputAdornment, InputProps } from '@mui/material';
import React, { FC } from 'react';
import { TextField } from '@mui/material';

interface InputPropsTypes extends InputProps {
  label?: string;
}

const Input: FC<InputPropsTypes> = (props) => {
  const {
    disabled,
    name,
    label,
    value,
    error = null,
    onChange,
    endAdornment,
    type,
  } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      disabled={disabled}
      onChange={onChange}
      type={type}
      InputProps={{
        endAdornment: <InputAdornment position="start">{endAdornment}</InputAdornment>,
      }}
      InputLabelProps={{
        shrink: true,
      }}
      {...(error && { error: true, helperText: error })}
    />
  );
};

export default Input;
