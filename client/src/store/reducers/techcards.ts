import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productsApi } from 'api/products-api';
import { TechCardType } from 'pages/Products/TechCard/types';
import { techCardsApi } from '../../api/techcard-api';
import { updateProduct } from './products';

const initialState = {
  techCardsList: [] as TechCardType[],
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
  async (param: { productId: string }, thunkAPI) => {
    try {
      const res = await techCardsApi.getTechCards(param.productId);
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
    builder.addCase(
      addTechCard.fulfilled,
      (state, action: PayloadAction<TechCardType>) => {
        state.techCardsList.unshift(action.payload);
      },
    );
    builder.addCase(fetchTechCards.fulfilled, (state, action: PayloadAction<any>) => {
      state.techCardsList = action.payload;
    });
  },
});

export const TechCardReducer = TechCardSlice.reducer;
