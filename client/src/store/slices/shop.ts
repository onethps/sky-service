import { createSlice } from '@reduxjs/toolkit';

type shopType = {
  storeId: string;
  adminId: string;
  storeName: string;
};

const initialState = {
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

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function

export const shopReducer = shopSlice.reducer;
