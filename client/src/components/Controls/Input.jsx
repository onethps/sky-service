import { Box } from '@mui/material';
import React from 'react';
import { TextField } from '@material-ui/core';

export default function Input(props) {
  const { name, label, value, error = null, onChange } = props;
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
        {...(error && { error: true, helperText: error })}
      />
    </Box>
  );
}
