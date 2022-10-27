import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { Button, Grid } from '@mui/material';
import { Controls } from '../../components/Controls';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../store/firebase';
import { ROUTERS } from '../../router/AppRoutes';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { registerUser } from '../../store/slices/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const registerHandle = async (email: string, password: string) => {
    dispatch(registerUser({ email, password }));
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
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
      </Grid>{' '}
      <Grid item>
        <Controls.Input
          name={'password'}
          label={'Password'}
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </Grid>
      <Grid item>
        <Controls.Button
          text={'REGISTER'}
          onClick={() => registerHandle(email, password)}
        />
      </Grid>
      <Grid item>
        <Button onClick={() => nav(ROUTERS.LOGIN)}>Login</Button>
      </Grid>
    </Grid>
  );
};

export default Register;
