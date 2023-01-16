import { ProductType } from 'features/ProductsPage/bll/types';
import { productsApi } from 'features/ProductsPage/dal/products-api';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk<
  ProductType[],
  undefined,
  {
    rejectValue: string;
  }
>('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const res = await productsApi.getProducts();
    return res.data;
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

export const addProduct = createAsyncThunk<
  ProductType,
  { product: ProductType },
  {
    rejectValue: string;
  }
>('products/addProduct', async (param: { product: ProductType }, { rejectWithValue }) => {
  try {
    const res = await productsApi.addProduct(param.product);
    return res.data;
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

export const updateProduct = createAsyncThunk<
  ProductType,
  { id: string; product: ProductType },
  {
    rejectValue: string;
  }
>('products/updateProduct', async ({ id, product }, { rejectWithValue }) => {
  try {
    const res = await productsApi.updateProduct(id, product);
    return res.data;
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

export const updateProducts = createAsyncThunk<
  ProductType[],
  { products: ProductType[] },
  {
    rejectValue: string;
  }
>('products/updateProducts', async ({ products }, { rejectWithValue }) => {
  try {
    const response = await productsApi.updateProducts(products);
    return response.data;
  } catch (error) {
    return rejectWithValue(error as string);
  }
});
