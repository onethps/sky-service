import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type shopType = {
  storeId: string;
  adminId: string;
  storeName: string;
};

const initialState: shopType = {} as shopType;

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function

export const shopReducer = shopSlice.reducer;
