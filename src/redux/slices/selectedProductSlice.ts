// src/redux/slices/selectedProductSlice.ts

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CartItem} from "../../../types";

interface SelectedProductState {
  products: CartItem[];
}

const initialState: SelectedProductState = {
  products: [],
};

const selectedProductSlice = createSlice({
  name: "selectedProduct",
  initialState,
  reducers: {
    selectProduct(state, action: PayloadAction<CartItem[]>) {
      state.products = action.payload;
    },
    clearSelectedProduct(state) {
      state.products = [];
    },
    // New reducer to update a single product
    updateProduct(
      state,
      action: PayloadAction<{selectedArticles: CartItem[]}>
    ) {
      const {selectedArticles} = action.payload;
      state.products = selectedArticles;
    },
    // New reducer to remove a product
    removeProduct(state, action: PayloadAction<number>) {
      // Payload is 'partid'
      state.products = state.products.filter(
        (item) => item.branchparts?.[0]?.partid !== action.payload
      );
    },
  },
});

export const {
  selectProduct,
  clearSelectedProduct,
  updateProduct,
  removeProduct,
} = selectedProductSlice.actions;

export default selectedProductSlice.reducer;
