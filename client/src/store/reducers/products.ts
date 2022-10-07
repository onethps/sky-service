import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from 'pages/Products/types';
import { productsApi } from 'api/products-api';
import { ThunkError } from 'store/store';

const initialState = {
  products: [] as any[],
  loading: false,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (param, thunkAPI) => {
    try {
      const res = await productsApi.getProducts();
      return res.data;
    } catch (error) {
      return console.log(error);
    }
  },
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (param: { product: ProductType }, thunkAPI) => {
    try {
      const res = await productsApi.addProduct(param.product);
      return res.data;
    } catch (error) {
      return console.log(error);
    }
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<any>) => {
      state.products = action.payload;
    });

    builder.addCase(addProduct.fulfilled, (state, action: PayloadAction<any>) => {
      state.products.unshift(action.payload);
    });
  },
});

// Action creators are generated for each case reducer function

export const productsReducer = productsSlice.reducer;
