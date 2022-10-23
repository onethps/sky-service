import { combineReducers } from '@reduxjs/toolkit';
import { productsReducer } from 'store/slices/products';
import { shopReducer } from 'store/slices/shop';
import { authReducer } from './slices/auth';
export const rootReducer = combineReducers({
  products: productsReducer,
  shop: shopReducer,
  // app: appReducer,
  auth: authReducer,
  // todolists: todolistsReducer,
  // tasks: tasksReducer
});

//TODO//
//rename slices on index and on slices
