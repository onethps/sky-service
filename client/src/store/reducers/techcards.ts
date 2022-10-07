import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from 'pages/Products/types';
import { productsApi } from 'api/products-api';

const initialState = {
  techCards: [] as any[],
  loading: false,
};

export const techCardsSlice = createSlice({
  name: 'techCards',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function

export const techCardsReducer = techCardsSlice.reducer;
