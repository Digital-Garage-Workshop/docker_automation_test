// src/redux/slices/shippingMethodSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export type ShippingMethodType = 'delivery' | 'pickup' | null;

interface ShippingMethodState {
  shippingMethod: ShippingMethodType;
}

const initialState: ShippingMethodState = {
  shippingMethod: null, // No shipping method selected initially
};

const shippingMethodSlice = createSlice({
  name: 'shippingMethod',
  initialState,
  reducers: {
    setDelivery: (state) => {
      state.shippingMethod = 'delivery';
    },
    setPickup: (state) => {
      state.shippingMethod = 'pickup';
    },
    clearShippingMethod: (state) => {
      state.shippingMethod = null;
    },
    setShippingMethod: (state, action: PayloadAction<ShippingMethodType>) => {
      state.shippingMethod = action.payload;
    },
  },
});

export const {
  setDelivery,
  setPickup,
  clearShippingMethod,
  setShippingMethod,
} = shippingMethodSlice.actions;

export default shippingMethodSlice.reducer;
