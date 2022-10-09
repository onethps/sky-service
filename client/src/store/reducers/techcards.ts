import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from "store/reducers/products";
import { productsApi } from "api/products-api";

export type initTechCard = {
  techCardsList: TechCardType[];
};

export type TechCardType = {
  _id: string;
  productId: string;
  modName: string;
  modTables: modTableType[];
  priceForPortion: string;
  netPrice: string;
  price: string;
  marginPricePercent: string;
};

export type modTableType = {
  name: string;
  count: string;
  brutto: string;
  netto: string;
  price: string;
  summ: string;
};

const initTechCardTable: modTableType = {
  name: '',
  count: '',
  brutto: '',
  netto: '',
  price: '',
  summ: '',
};

const initialState: initTechCard = {
  techCardsList: [
    {
      _id: '',
      productId: '',
      modName: '',
      modTables: [{ ...initTechCardTable }],
      priceForPortion: '',
      netPrice: '',
      price: '',
      marginPricePercent: '',
    },
  ],
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

export const TechCardSlice = createSlice({
  name: 'techCardsList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<any>) => {
      state.techCardsList = action.payload;
    });
});

// Action creators are generated for each case reducer function

export const TechCardReducer = TechCardSlice.reducer;
