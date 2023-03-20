import { ProductService } from 'features/ProductsPage/api/products-api';
import { IProduct } from 'interfaces/product.interfaces';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk<
  IProduct[],
  undefined,
  {
    rejectValue: string;
  }
>('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const res = await ProductService.getProducts();
    return res.data;
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

export const addProduct = createAsyncThunk<
  IProduct,
  { product: IProduct },
  {
    rejectValue: string;
  }
>('products/addProduct', async ({ product }, { rejectWithValue }) => {
  try {
    const res = await ProductService.addProduct(product);
    return res.data;
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

export const updateProduct = createAsyncThunk<
  IProduct,
  { id: string; product: IProduct },
  {
    rejectValue: string;
  }
>('products/updateProduct', async ({ id, product }, { rejectWithValue }) => {
  try {
    const res = await ProductService.updateProduct(id, product);
    return res.data;
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

export const updateProducts = createAsyncThunk<
  IProduct[],
  { products: IProduct[] },
  {
    rejectValue: string;
  }
>('products/updateProducts', async ({ products }, { rejectWithValue }) => {
  try {
    const response = await ProductService.updateProducts(products);
    return response.data;
  } catch (error) {
    return rejectWithValue(error as string);
  }
});
