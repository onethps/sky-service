import { FC } from 'react';
import { FormProps } from 'react-router-dom';

const Form: FC<FormProps> = (props) => {
  const { children, ...other } = props;
  return (
    <form autoComplete="off" {...other}>
      {children}
    </form>
  );
};

export default Form;
