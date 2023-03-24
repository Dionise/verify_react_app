import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchHistory} from '../api/ApiHistory';

export const getHistory = createAsyncThunk(
  'history/getHistory',
  async (_, thunkAPI) => {
    try {
      const response = await fetchHistory();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const historySlice = createSlice({
  name: 'history',
  initialState: {
    history: [],
    loading: false,
    error: null,
  },

  extraReducers: builder => {
    builder.addCase(getHistory.fulfilled, (state, action) => {
      state.history = action.payload;
    });
  },
});

export default historySlice.reducer;
