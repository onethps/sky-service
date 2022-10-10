import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from 'store/reducers/products';
import { productsApi } from 'api/products-api';
import { modTableType, TechCardType } from 'pages/Products/TechCard/types';
import { v4 as uuidv4 } from 'uuid';

export type initTechCard = {
  techCardsList: TechCardType[];
};

export const fetchTechCards = createAsyncThunk(
  'tech/fetchTechCards',
  async (param, thunkAPI) => {
    try {
      const res = await productsApi.getProducts();
      return res.data;
    } catch (error) {
      return console.log(error);
    }
  },
);

const initialState = {
  techCardsList: [],
};

export const TechCardSlice = createSlice({
  name: 'techCardsList',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function

export const TechCardReducer = TechCardSlice.reducer;
