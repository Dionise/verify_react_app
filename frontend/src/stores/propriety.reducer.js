import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  addproprietydetails,
  searchAddresses,
  updateFavoritePropertyStatus,
  fetchFavorites,
  deleteFavorite,
} from '../api/ApiPropriety.js';

export const searchAddress = createAsyncThunk(
  'propriety/search-address',
  async ({query}, thunkAPI) => {
    try {
      const response = await searchAddresses(query);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addpropriety = createAsyncThunk(
  'propriety/save-location',
  async (
    {location, latitude, longitude, address, details, place_id},
    thunkAPI,
  ) => {
    try {
      const response = await addproprietydetails(
        location,
        latitude,
        longitude,
        address,
        details,
        place_id,
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const toggleFavoriteProperty = createAsyncThunk(
  'propriety/toggle-favorite',
  async ({place_id, is_favorite}, thunkAPI) => {
    try {
      const response = await updateFavoritePropertyStatus(
        place_id,
        is_favorite,
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getFavorites = createAsyncThunk(
  'propriety/getFavorites',
  async (_, thunkAPI) => {
    try {
      const response = await fetchFavorites();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteFavoriteById = createAsyncThunk(
  'propriety/deletefavorite',
  async (id, thunkAPI) => {
    try {
      await deleteFavorite(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const proprietySlice = createSlice({
  name: 'propriety',
  initialState: {
    propriety: null,
    loading: false,
    registered: false,
    searchResults: [],
    favorites: null,
    is_favorite: false,
  },
  reducers: {
    resetRegistered: state => {
      state.registered = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(addpropriety.pending, state => {
        state.loading = true;
      })
      .addCase(addpropriety.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.propriety = action.payload;
        state.is_favorite = action.payload;
      })
      .addCase(addpropriety.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchAddress.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      })

      .addCase(toggleFavoriteProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase('propriety/restoreState', (state, action) => {
        state.propriety = action.payload.propriety;
        state.is_favorite = action.payload.is_favorite;
      });
  },
});

export default proprietySlice.reducer;
