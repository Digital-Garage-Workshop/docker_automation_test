// src/store/slices/mainSearchSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MainSearchState {
  isMainSearchChanged: boolean;
}

const initialState: MainSearchState = {
  isMainSearchChanged: false,
};

const mainSearchSlice = createSlice({
  name: 'isMainSearchChanged',
  initialState,
  reducers: {
    setMainSearch: (state, action: PayloadAction<boolean>) => {
      state.isMainSearchChanged = action.payload;
    },
  },
});

export const { setMainSearch } = mainSearchSlice.actions;
export default mainSearchSlice.reducer;