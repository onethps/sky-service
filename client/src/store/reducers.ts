import { combineReducers } from '@reduxjs/toolkit';
import { productsReducer } from 'store/reducers/products';
import { shopReducer } from 'store/reducers/shop';
export const rootReducer = combineReducers({
  products: productsReducer,
  shop: shopReducer,
  // app: appReducer,
  // auth: authReducer,
  // todolists: todolistsReducer,
  // tasks: tasksReducer
});
