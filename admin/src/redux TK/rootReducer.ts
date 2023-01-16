import { productsReducer } from 'features/ProductsPage/bll/productsSlice';
import { shopReducer } from 'redux TK/reducers/shop';

import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  products: productsReducer,
  shop: shopReducer,
});
