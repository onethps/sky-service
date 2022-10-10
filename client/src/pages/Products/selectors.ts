import { AppRootStateType } from 'store/store';

export const selectProducts = (state: AppRootStateType) => state.products;
export const selectTechCards = (state: AppRootStateType) => state.techcards.techCardsList;
