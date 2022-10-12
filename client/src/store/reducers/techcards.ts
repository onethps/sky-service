import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productsApi } from 'api/products-api';
import { TechCardType } from 'pages/Products/TechCard/types';
import { techCardsApi } from '../../api/techcard-api';

export type initTechCard = {
  techCardsList: TechCardType[];
};

export const addTechCard = createAsyncThunk<
  TechCardType,
  { techCard: TechCardType },
  {
    rejectValue: any; // Error type
  }
>('tech/addTechCard', async (param: { techCard: TechCardType }, { rejectWithValue }) => {
  try {
    const res = await techCardsApi.addTechCard(param.techCard);
    return res.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error);
  }
});

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
  techCardsList: [] as TechCardType[],
};

export const TechCardSlice = createSlice({
  name: 'techCardsList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      addTechCard.fulfilled,
      (state, action: PayloadAction<TechCardType>) => {
        state.techCardsList.unshift(action.payload);
      },
    );
  },
});

export const TechCardReducer = TechCardSlice.reducer;
