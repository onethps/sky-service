import { productsReducer } from 'features/HomePage/bll/productsSlice';
import { shopReducer } from 'redux TK/reducers/shop';

import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  products: productsReducer,
  shop: shopReducer,
});
