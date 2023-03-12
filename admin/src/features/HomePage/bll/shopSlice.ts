import { SHOP_API } from 'features/HomePage/api/shop-api';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface IShop {
  _id: string;
  address: string;
  userId: string;
  name: string;
}

export const fetchShop = createAsyncThunk<
  IShop,
  { userId: string },
  {
    rejectValue: string;
  }
>('shop/fetchShop', async ({ userId }, { rejectWithValue }) => {
  try {
    const res = await SHOP_API.getShopData(userId);
    return res.data;
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

const initialState: IShop = {} as IShop;

export const { reducer, actions } = createSlice({
  name: 'shop',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchShop.fulfilled, (state, { payload }) => {
      state = payload;
    });
  },
});

export const shopReducer = reducer;
