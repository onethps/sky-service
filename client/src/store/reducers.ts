import { combineReducers } from '@reduxjs/toolkit';
import { productsReducer } from 'store/reducers/products';
import { techCardsReducer } from 'store/reducers/techcards';

export const rootReducer = combineReducers({
  products: productsReducer,
  techCards: techCardsReducer,
  // app: appReducer,
  // auth: authReducer,
  // todolists: todolistsReducer,
  // tasks: tasksReducer
});
