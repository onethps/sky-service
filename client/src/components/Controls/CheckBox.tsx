import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
  CheckboxProps,
} from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';

interface CheckBox extends CheckboxProps {
  label: string;
}

const Checkbox: FC<CheckBox> = ({ name, label, value, onChange }) => {
  const [checked, setChecked] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <MuiCheckbox
      checked={checked}
      name={name}
      value={value}
      onChange={onChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
};

export default Checkbox;
