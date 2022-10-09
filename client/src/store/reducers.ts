import { combineReducers } from '@reduxjs/toolkit';
import { productsReducer } from 'store/reducers/products';
import { shopReducer } from 'store/reducers/shop';
import { TechCardReducer } from 'store/reducers/techcards';
export const rootReducer = combineReducers({
  products: productsReducer,
  shop: shopReducer,
  techcards: TechCardReducer,
  // app: appReducer,
  // auth: authReducer,
  // todolists: todolistsReducer,
  // tasks: tasksReducer
});
