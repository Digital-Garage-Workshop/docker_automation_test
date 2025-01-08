import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getSession } from 'next-auth/react';
interface UserState {
  isLoading: boolean;
  userInfo: any;
  accessToken: string | undefined;
}

const initialState: UserState = {
  isLoading: false,
  userInfo: null,
  accessToken: undefined, // Add accessToken to the initial state
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<{ user: any; accessToken: string }>) => {
      state.userInfo = action.payload.user;
      state.accessToken = action.payload.accessToken; // Store the accessToken in Redux state
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
      state.accessToken = undefined; // Clear accessToken on logout
    },
  },
});

export const { setUserInfo, setLoading, logout } = userSlice.actions;

// Selector to get the user state
export const selectUser = (state: RootState) => state.user;

// Export the reducer
export const userReducer = userSlice.reducer;