import React, { FC, ReactNode } from 'react';
import { useAuth } from '../../hooks/use-auth';
import { useNavigate } from 'react-router-dom';

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { email } = useAuth();
  const nav = useNavigate();

  if (!email) {
    nav('/login');
  }

  return <div>{children}</div>;
};

export default AuthProvider;
