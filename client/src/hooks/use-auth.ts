import { AppRootStateType } from '../store/store';
import { useAppSelector } from './redux-hooks';

export const useAuth = () => {
  const { email, number } = useAppSelector((state: AppRootStateType) => state.auth);

  return {
    email,
    number,
  };
};
