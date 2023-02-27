import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit'
import { getUser, registerUser } from '../api/fakeApiUser'

export const fetchUser = createAsyncThunk('user/getUser', async () => {
  const response = await getUser()
  return response.data
})

export const register = createAsyncThunk(
  'users/register',
  async ({ firstName, lastName, email, password }, thunkAPI) => {
    try {
      const response = await registerUser(firstName, lastName, email, password)
      return response
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

const userAdapter = createEntityAdapter()

const userSlice = createSlice({
  name: 'user',
  initialState: userAdapter.getInitialState({
    isLoading: false,
    isAuthenticated: false,
    user: null,
    loading: false,
    registered: false,
    error: null
  }),
  reducers: {
    resetRegistered: state => {
      state.registered = false
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        userAdapter.setAll(state, action.payload)
        state.isLoading = false
      })
      .addCase(fetchUser.rejected, state => {
        state.isLoading = false
      })
      .addCase(register.pending, state => {
        state.loading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.registered = true
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { selectAll } = userAdapter.getSelectors(state => state.user)

export default userSlice.reducer
