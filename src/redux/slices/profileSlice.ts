import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  clickedSideBar: string;
}

const initialState: UserState = {
  clickedSideBar: 'Хэрэглэгчийн тохиргоо',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setClickedSideBar: (state, action: PayloadAction<{ clickedSideBar: string }>) => {
      state.clickedSideBar = action.payload.clickedSideBar;
    },
  },
});

export const { setClickedSideBar } = profileSlice.actions;

export default profileSlice.reducer;
