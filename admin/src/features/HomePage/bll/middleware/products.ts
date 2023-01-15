import { productsApi } from 'features/HomePage/dal/products-api';
import { ProductType } from 'features/ProductsPage/bll/types';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  try {
    const res = await productsApi.getProducts();
    return res.data;
  } catch (error) {
    return console.log(error);
  }
});

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
  async (param: { products: ProductType[] }) => {
    try {
      await productsApi.updateProducts(param.products);
    } catch (error) {
      return console.log(error);
    }
  },
);
