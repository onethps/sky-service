import { IProduct } from 'interfaces/product.interfaces';

import { createSlice } from '@reduxjs/toolkit';

import { addProduct, fetchProducts, updateProduct } from './middleware/products';

const initialState = {
  products: [] as IProduct[],
  loading: false,
};

export const { reducer, actions } = createSlice({
  name: 'productsReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.products = payload;
      })

      .addCase(addProduct.fulfilled, (state, { payload }) => {
        state.products.unshift(payload);
      })

      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        const findIndex = state.products.findIndex(
          (product) => product.id === payload.id,
        );
        state.products[findIndex] = payload;
      });
  },
});

export const productsReducer = reducer;
