import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { Grid } from '@mui/material';
import { Controls } from '../../components/Controls';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../store/firebase';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerHandle = async (email: string, password: string) => {
    const auth = getAuth(app);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res.user);
    } catch (err: any) {
      const errorCode = err.code;
      const errorMessage = err.message;
    }
  };

  return (
    <Layout>
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
      </Grid>
    </Layout>
  );
};

export default Register;
