import { shopReducer } from 'features/HomePage/bll/shopSlice';
import { productsReducer } from 'features/ProductsPage/bll/productsSlice';

import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  products: productsReducer,
  shop: shopReducer,
});
