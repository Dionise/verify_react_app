import {configureStore} from '@reduxjs/toolkit';
import userReducer from './user.reducer';
import proprietySlice from './propriety.reducer';
import notesSlice from './note.slice';
import historySlice from './history.slice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    propriety: proprietySlice,
    notes: notesSlice,
    history: historySlice,
  },
});
