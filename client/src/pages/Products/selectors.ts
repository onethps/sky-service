import { AppRootStateType } from 'store/store';

export const selectProducts = (state: AppRootStateType) => state.products;
