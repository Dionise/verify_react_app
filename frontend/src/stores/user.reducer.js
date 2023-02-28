import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit'
import {
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  checkAuthentication,
  resetPassword,
  resetPasswordConfirmations
} from '../api/ApiUser'

import AsyncStorage from '@react-native-async-storage/async-storage'

export const fetchUser = createAsyncThunk('users/me', async () => {
  const response = await getUser()
  return response.data
})

export const register = createAsyncThunk(
  'users/register/',
  async ({ firstName, lastName, email, password }, thunkAPI) => {
    try {
      const response = await registerUser(firstName, lastName, email, password)
      return response
    } catch (err) {
      const { detail } = err.response.data
      const fieldErrors = {}
      Object.keys(detail).forEach(key => {
        const error = detail[key][0]
        switch (key) {
          case 'email':
            fieldErrors.email = error
            break
          case 'password':
            fieldErrors.password = error
            break
          case 'first_name':
            fieldErrors.firstName = error
            break
          case 'last_name':
            fieldErrors.lastName = error
            break
          default:
            break
        }
      })
      return thunkAPI.rejectWithValue(fieldErrors)
    }
  }
)

export const login = createAsyncThunk(
  'users/login/',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await loginUser(email, password)
      const token = response.data.access // Retrieve token from response
      await AsyncStorage.setItem('token', token) // Store token in AsyncStorage
      return token // Return token as part of the action payload
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const logout = createAsyncThunk('users/logout/', async thunkAPI => {
  try {
    const response = await logoutUser()
    return response
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const checkAuth = createAsyncThunk(
  'users/verify',
  async (_, thunkAPI) => {
    try {
      const response = await checkAuthentication()
      return response
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const sendResetPassword = createAsyncThunk(
  'users/sendResetPassword/',
  async ({ email }, thunkAPI) => {
    console.log(email)
    console.log('okoko')
    try {
      const response = await resetPassword(email)
      return response
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const resetPasswordConfirmation = createAsyncThunk(
  'users/resetPasswordConfirmation/',
  async ({ token, password }, thunkAPI) => {
    try {
      const response = await resetPasswordConfirmations(token, password)
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
    error: null,
    token: null
  }),
  reducers: {
    resetRegistered: state => {
      state.registered = false
    }
  },
  extraReducers: builder => {
    builder
      // Add this case to handle the `fetchUser` action
      .addCase(
        (fetchUser.fulfilled = (state, action) => {
          state.user = action.payload
          state.loading = false
          state.error = null
        })
      )
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
      .addCase(login.pending, state => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload && action.payload.access) {
          state.isAuthenticated = true
          state.user = action.payload.user
          state.token = action.payload.access
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const selectAuthState = state => state.user.isAuthenticated
export const selectUser = state => state.user
export const { selectAll } = userAdapter.getSelectors(state => state.user)

export default userSlice.reducer
