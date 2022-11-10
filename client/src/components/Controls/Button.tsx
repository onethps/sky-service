import { Button as MuiButton, ButtonProps } from '@mui/material';
import { FC } from 'react';

type ButtonType = {
  text?: string;
  size?: string;
  color?: string;
  variant?: string;
  onClick?: () => void;
};

const Button: FC<ButtonType & ButtonProps> = ({
  text,
  size,
  color,
  variant,
  onClick,
  ...restProps
}) => {
  return (
    <MuiButton
      fullWidth
      variant={variant || 'contained'}
      size={size || 'large'}
      color={color || 'primary'}
      onClick={onClick}
      {...restProps}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
