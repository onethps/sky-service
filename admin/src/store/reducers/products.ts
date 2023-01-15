import { productsApi } from 'api/products-api';
import { ProductType } from 'pages/Products/types';

import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState = {
  products: [] as ProductType[],
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

export const addProduct = createAsyncThunk<
  ProductType,
  { product: ProductType },
  {
    rejectValue: string;
  }
>(
  'productsReducer/addProduct',
  async (param: { product: ProductType }, { rejectWithValue }) => {
    try {
      const res = await productsApi.addProduct(param.product);
      return res.data;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  },
);

export const updateProduct = createAsyncThunk<
  ProductType,
  { id: string; product: ProductType },
  {
    rejectValue: string;
  }
>(
  'productsReducer/updateProduct',
  async (param: { id: string; product: ProductType }, { rejectWithValue }) => {
    try {
      const res = await productsApi.updateProduct(param.id, param.product);
      return res.data;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  },
);

export const updateProducts = createAsyncThunk(
  'productsReducer/updateProducts',
  async (param: { products: ProductType[] }, thunkAPI) => {
    try {
      await productsApi.updateProducts(param.products);
    } catch (error) {
      return console.log(error);
    }
  },
);

export const productsSlice = createSlice({
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

export const productsReducer = productsSlice.reducer;
