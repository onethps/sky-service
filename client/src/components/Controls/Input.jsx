import { Box, InputAdornment } from '@mui/material';
import React from 'react';
import { TextField } from '@mui/material';

export default function Input(props) {
  const { name, label, value, error = null, onChange, endAdornment, type, width } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      style={{ width: width || '25ch' }}
      name={name}
      value={value}
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
