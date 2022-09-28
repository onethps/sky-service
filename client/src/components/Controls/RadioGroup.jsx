import {
  FormControl,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from '@mui/material';

export default function RadioGroup(props) {
  const { name, label, value, onChange, items, error } = props;

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
      <MuiRadioGroup
        sx={error ? { p: 1, border: '1px solid red' } : { p: 1 }}
        row
        name={name}
        value={value}
        onChange={onChange}
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
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
      {error && (
        <Typography color={'error'} padding={1}>
          Required
        </Typography>
      )}
    </FormControl>
  );
}
