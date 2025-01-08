import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  mainCategoryId: number;
}

const initialState: FilterState = {
  mainCategoryId: 0,
};

const mainCateSlice = createSlice({
  name: "maincate",
  initialState,
  reducers: {
    setMainCategoryId(state, action: PayloadAction<number>) {
      state.mainCategoryId = action.payload;
    },
  },
});

export const { setMainCategoryId } = mainCateSlice.actions;

export default mainCateSlice.reducer;
