import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: {
    number: 380990519663,
    email: '',
  },
  wallet: [
    {
      walletId: 1,
      moneyType: 'electorinc',
      walletName: 'Osnovnoy',
      walletSumm: 0.0,
    },
  ],
  categories: [
    {
      id: 1,
      title: 'Salats',
    },
    {
      id: 2,
      title: 'deserts',
    },
  ],
};

export const techCardsSlice = createSlice({
  name: 'techCards',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function

export const techCardsReducer = techCardsSlice.reducer;
