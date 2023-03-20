import Cookies from 'js-cookie';

interface ITokens {
  accessToken: string;
  refreshToken: string;
}

interface IUser {
  email: string;
  password: string;
  accessToken: string;
}

export interface IAuthResponse extends ITokens {
  user: IUser;
}

export enum TOKENS {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

export const saveTokensStorage = (data: ITokens) => {
  Cookies.set(TOKENS.ACCESS_TOKEN, data.accessToken);
  Cookies.set(TOKENS.REFRESH_TOKEN, data.refreshToken);
};

export const getAccessToken = () => {
  const accessToken = Cookies.get(TOKENS.ACCESS_TOKEN);
  return accessToken || null;
};

export const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('user') || '{}');
};

export const removeDataFromStorage = () => {
  Cookies.remove(TOKENS.ACCESS_TOKEN);
  Cookies.remove(TOKENS.REFRESH_TOKEN);
  localStorage.removeItem('user');
};

export const saveToStorage = (data: IAuthResponse) => {
  saveTokensStorage(data);
  localStorage.setItem('user', JSON.stringify(data.user));
};
