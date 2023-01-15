import { ProductType } from 'features/ProductsPage/bll/types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { addProduct, fetchProducts, updateProduct } from './middleware/products';

const initialState = {
  products: [] as ProductType[],
  loading: false,
};

export const { reducer, actions } = createSlice({
  name: 'productsReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<any>) => {
      state.products = action.payload;
    });

    builder.addCase(addProduct.fulfilled, (state, { payload }) => {
      state.products.unshift(payload);
    });

    builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
      const findIndex = state.products.findIndex((el) => el._id === payload._id);
      state.products[findIndex] = payload;
    });
  },
});

// Action creators are generated for each case reducer function

export const productsReducer = reducer;
