import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from 'pages/Products/types';
import { productsApi } from 'api/products-api';
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

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (param: { id: string; product: ProductType }, thunkAPI) => {
    try {
      const res = await productsApi.updateProduct(param.id, param.product);
      return res.data;
    } catch (error) {
      return console.log(error);
    }
  },
);

export const updateProducts = createAsyncThunk(
  'products/updateProducts',
  async (param: { products: ProductType[] }, thunkAPI) => {
    try {
      await productsApi.updateProducts(param.products);
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

    builder.addCase(updateProduct.fulfilled, (state, action: PayloadAction<any>) => {
      const findIndex = state.products.findIndex((el) => el._id === action.payload.id);
      if (findIndex) {
        state.products[findIndex] = action.payload.product;
      }
    });
  },
});

// Action creators are generated for each case reducer function

export const productsReducer = productsSlice.reducer;
