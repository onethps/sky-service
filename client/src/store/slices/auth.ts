import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase';

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

export const registerUser = createAsyncThunk<
  any,
  { email: string; password: string },
  {
    rejectValue: any;
  }
>('auth/register', async ({ email, password }, { rejectWithValue }) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    const res = user.email;
    return res;
  } catch (err: any) {
    const errorCode = err.code;
    const errorMessage = err.message;
    return rejectWithValue(err as string);
  }
});

export const loginUser = createAsyncThunk<
  any,
  initType,
  {
    rejectValue: any;
  }
>('auth/login', async (param: initType, _) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, param.email, param.password);
    return user.email;
  } catch (err: any) {
    const errorCode = err.code;
    const errorMessage = err.message;
  }
});

export const Slice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.email = payload.email;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.email = payload;
    });
  },
});

// Action creators are generated for each case reducer function

export const authReducer = Slice.reducer;
