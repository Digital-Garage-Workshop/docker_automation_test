// src/redux/slices/paymentSlice.ts

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PaymentData} from "../../../types";

interface PaymentState {
  paymentData: PaymentData | null;
  loading: boolean;
  error: string | null;
  paymentid?: number | null
}

const initialState: PaymentState = {
  paymentData: null,
  loading: false,
  error: null,
  paymentid: null
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentData: (state, action: PayloadAction<PaymentData>) => {
      state.paymentData = action.payload;
    },
    updatePaymentStatus: (
      state,
      action: PayloadAction<{status: string; statustype: string}>
    ) => {
      if (state.paymentData) {
        // Assuming 'status' and 'statustype' are part of PaymentData
        (state.paymentData as any).status = action.payload.status;
        (state.paymentData as any).statustype = action.payload.statustype;
      }
    },
    clearPaymentData: (state) => {
      state.paymentData = null;
      state.error = null;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setPaymentid: (state, action: PayloadAction<number | null>) => {
      state.paymentid = action.payload;
    },
  },
});

export const {
  setPaymentData,
  updatePaymentStatus,
  clearPaymentData,
  setLoading,
  setError,
  setPaymentid,
} = paymentSlice.actions;

export default paymentSlice.reducer;
