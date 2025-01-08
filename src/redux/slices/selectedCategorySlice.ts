
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedCategoryImage: false,
    selectedCategoryName: null,
};

export const selectedCategorySlice = createSlice({
  name: 'selectedCategory',
  initialState,
  reducers: {
    setSelectedCategoryImage: (state, action) => {
      state.selectedCategoryImage = action.payload;
    },
    setSelectedCategoryName: (state, action) => {
        state.selectedCategoryName = action.payload;
      },
  },
});

export const { setSelectedCategoryImage,setSelectedCategoryName } = selectedCategorySlice.actions;

export default selectedCategorySlice.reducer;
