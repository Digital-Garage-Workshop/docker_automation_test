// src/redux/slices/orderSlice.ts

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {OrderData} from "../../../types/orderReponse";

interface OrderState {
  orderData: OrderData | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orderData: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderData: (state, action: PayloadAction<OrderData>) => {
      state.orderData = action.payload;
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{status: string; statustype: string}>
    ) => {
      if (state.orderData) {
        state.orderData.status = action.payload.status;
        state.orderData.statustype = action.payload.statustype;
      }
    },
    clearOrderData: (state) => {
      state.orderData = null;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setOrderData,
  updateOrderStatus,
  clearOrderData,
  setLoading,
  setError,
} = orderSlice.actions;

export default orderSlice.reducer;
