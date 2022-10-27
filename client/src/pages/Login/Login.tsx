import React, { useState } from 'react';
import { Controls } from '../../components/Controls';
import { Button, Grid } from '@mui/material';
import { ROUTERS } from '../../router/AppRoutes';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../store/slices/auth';
import { useAppDispatch } from '../../hooks/redux-hooks';

const Login = () => {
  const [email, setEmail] = useState('vasyapupkin@gmail.com');
  const [password, setPassword] = useState('asdas21312ds');
  const nav = useNavigate();

  const dispatch = useAppDispatch();

  const login = async (email: string, password: string) => {
    dispatch(loginUser({ email, password, number: '21312' }));
    nav(ROUTERS.HOME);
  };

  return (
    <Grid
      rowSpacing={{ xs: 1, sm: 2, md: 3 }}
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Grid item>
        <Controls.Input
          name={'email'}
          label={'Email'}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Grid>{' '}
      <Grid item>
        <Controls.Input
          name={'password'}
          label={'Password'}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Grid>
      <Grid item>
        <Controls.Button text={'LOGIN'} onClick={() => login(email, password)} />
      </Grid>
      <Grid item>
        <Button onClick={() => login(email, password)}>REGISTER</Button>
      </Grid>
    </Grid>
  );
};

export default Login;
