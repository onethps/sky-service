import axios from 'axios';
import Cookies from 'js-cookie';

import { getCOntentType } from './../api.helper';
import { IAuthResponse, saveToStorage, TOKENS } from './auth.helper';

interface IEmailPassword {
  email: string;
  password: string;
}

export const AuthService = {
  async main(type: 'login' | 'register', data: IEmailPassword) {
    const response = await axios.post<IAuthResponse>(`/auth/${type}`, data);
    if (response.data.accessToken) saveToStorage(response.data);
  },

  async getNewTokens() {
    const refreshToken = Cookies.get(TOKENS.REFRESH_TOKEN);

    const response = await axios.post<
      string,
      {
        data: IAuthResponse;
      }
    >(
      process.env.SERVER_URL + '/auth/login/access-token',
      { refreshToken },
      {
        headers: getCOntentType(),
      },
    );

    if (response.data.accessToken) saveToStorage(response.data);
  },
};
