import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {ProductArray, Product} from "../../../types";

const initialState: ProductArray = {
  products: [],
};

const viewedProductSlice = createSlice({
  name: "viewedProduct",
  initialState,
  reducers: {
    // Add a product to the viewed products
    add: (state, action: PayloadAction<Product | null>) => {
      const existingProduct = state.products.find(
        (product) => product.articleid === action?.payload?.articleid
      );
      if (!existingProduct) {
        //   state.products.push(action?.payload ||);
        if (action?.payload) {
          state.products.push(action?.payload);
        }
      }
    },

    // Remove a product from the viewed products based on articleid
    remove: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.articleid !== action.payload
      );
    },

    // Clear the viewed products list
    clear: (state) => {
      state.products = [];
    },

    // Set the entire viewed products list (useful for initializing from persisted state)
    set: (state, action: PayloadAction<ProductArray>) => {
      state.products = action.payload.products;
    },
  },
});
export const selectViewedProducts = (state: RootState) =>
  state.viewedProduct.products;

export const {add, remove, set, clear} = viewedProductSlice.actions;

export default viewedProductSlice.reducer;
