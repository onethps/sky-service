import {
  FormControl,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  RadioGroupProps,
} from '@mui/material';
import { FC } from 'react';

interface RadioGroupTypes extends RadioGroupProps {
  label?: string;
  items: any[];
  errorMessage: boolean;
}

const RadioGroup: FC<RadioGroupTypes> = (props) => {
  const { name, label, value, onChange, items, errorMessage } = props;

  return (
    <FormControl>
      <FormLabel id="radio-buttons-group-label">{label}</FormLabel>
      <MuiRadioGroup
        sx={errorMessage ? { p: 1, border: '1px solid red' } : { p: 1 }}
        row
        name={name}
        value={value}
        onChange={onChange}
        aria-labelledby="radio-buttons-group-label"
      >
        {items.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.title}
            control={<Radio />}
            label={item.title}
          />
        ))}
      </MuiRadioGroup>
      {errorMessage && (
        <Typography color={'error'} padding={1}>
          Required
        </Typography>
      )}
    </FormControl>
  );
};

export default RadioGroup;
