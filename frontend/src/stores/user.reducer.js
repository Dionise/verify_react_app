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

  return response
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
  'users/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await loginUser(email, password)
      const token = response.access
      await AsyncStorage.setItem('token', token)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const logout = createAsyncThunk('users/logout/', async (_, thunkAPI) => {
  try {
    const response = await logoutUser()
    await AsyncStorage.removeItem('token')
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
  initialState: {
    auth: {
      isLoading: false,
      isAuthenticated: false,
      user: null,
      loading: false,
      registered: false,
      error: null,
      token: null
    }
  },
  reducers: {
    resetRegistered: state => {
      state.auth.registered = false
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.auth.user = action.payload
        state.auth.isAuthenticated = true
      })
      .addCase(register.pending, state => {
        state.auth.loading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.auth.loading = false
        state.auth.registered = true
        state.auth.user = action.payload
        state.auth.isAuthenticated = true
      })
      .addCase(register.rejected, (state, action) => {
        state.auth.loading = false
        state.auth.error = action.payload
      })
      .addCase(login.pending, state => {
        state.auth.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.auth.loading = false
        state.auth.isAuthenticated = true
        state.auth.user = action.payload.user
        state.auth.token = action.payload.access
      })
      .addCase(login.rejected, (state, action) => {
        state.auth.loading = false
        state.auth.error = action.payload
      })
  }
})

export const selectAuthState = state => state.user.auth.isAuthenticated
export const selectUser = state => state.user.auth.user

export default userSlice.reducer
