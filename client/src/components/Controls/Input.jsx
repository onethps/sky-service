import { Box, FormControl, InputAdornment } from '@mui/material';
import React from 'react';
import { TextField } from '@mui/material';

export default function Input(props) {
  const {
    disabled,
    name,
    label,
    value,
    error = null,
    onChange,
    endAdornment,
    type,
    minWidth,
    maxWidth,
    ...restProps
  } = props;
  return (
    <TextField
      {...restProps}
      variant="outlined"
      label={label}
      style={{ minWidth: minWidth || '25ch', maxWidth: maxWidth }}
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
}
