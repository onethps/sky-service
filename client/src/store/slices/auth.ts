import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type initType = {
  email: string;
  number: string;
  password: string;
};

const initialState: initType = {
  email: '',
  number: '',
  password: '',
};

export const Slice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function

export const authReducer = Slice.reducer;
