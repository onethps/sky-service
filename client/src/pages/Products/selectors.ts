import { AppRootStateType } from 'store/store';
import { initTechCard, TechCardType } from 'store/reducers/techcards';

export const selectProducts = (state: AppRootStateType) => state.products;
export const selectTechCards = (state: AppRootStateType) => state.techcards.techCardsList;
