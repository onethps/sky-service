import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  productType: PRODUCT_TYPES[0].title,
  category: '--',
  inSale: true,
  quantity: '',
  unit: 'шт.',
  minQuantity: '',
  netCost: '',
  marginPrice: '',
  price: '',
};

export const counterSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

const productsReducer = counterSlice.reducer;

export default productsReducer;
