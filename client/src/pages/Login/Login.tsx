import React, { useState } from 'react';
import { Controls } from '../../components/Controls';
import { Button, Grid } from '@mui/material';
import Layout from '../../components/Layout/Layout';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app } from '../../store/firebase';
import { ROUTERS } from '../../router/AppRoutes';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandle = async (email: string, password: string) => {
    const auth = getAuth(app);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res.user);
    } catch (err: any) {
      const errorCode = err.code;
      const errorMessage = err.message;
    }
  };

  const nav = useNavigate();
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
        <Controls.Button text={'LOGIN'} onClick={() => loginHandle(email, password)} />
      </Grid>
      <Grid item>
        <Button onClick={() => nav(ROUTERS.REGISTER)}>REGISTER</Button>
      </Grid>
    </Grid>
  );
};

export default Login;
