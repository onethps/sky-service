import { productsReducer } from 'store/reducers/products';
import { shopReducer } from 'store/reducers/shop';

import { combineReducers } from '@reduxjs/toolkit';
export const rootReducer = combineReducers({
  products: productsReducer,
  shop: shopReducer,
  // app: appReducer,
  // auth: authReducer,
  // todolists: todolistsReducer,
  // tasks: tasksReducer
});
