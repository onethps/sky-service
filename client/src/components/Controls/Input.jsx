import { Box, InputAdornment } from '@mui/material';
import React from 'react';
import { TextField } from '@mui/material';

export default function Input(props) {
  const { name, label, value, error = null, onChange, endAdornment } = props;
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { width: '15ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        variant="outlined"
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        InputProps={{
          endAdornment: <InputAdornment position="start">{endAdornment}</InputAdornment>,
        }}
        InputLabelProps={{
          shrink: true,
        }}
        {...(error && { error: true, helperText: error })}
      />
    </Box>
  );
}
