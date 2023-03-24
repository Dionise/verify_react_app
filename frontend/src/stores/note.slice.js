import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchNotes} from '../api/ApiNotes';

export const getNotes = createAsyncThunk(
  'notes/getNotes',
  async (_, thunkAPI) => {
    try {
      const response = await fetchNotes();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const createnotes = createAsyncThunk(
  'notes/createnotes',
  async (noteData, thunkAPI) => {
    try {
      const response = await addnotes(noteData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    loading: false,
    error: null,
  },

  extraReducers: builder => {
    builder.addCase(getNotes.fulfilled, (state, action) => {
      state.notes = action.payload;
    });
  },
});

export default notesSlice.reducer;
