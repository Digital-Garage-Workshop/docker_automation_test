import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  phone: string;
  apartmentNumber: string;
  entranceAndDoorNumber: string;
  additionalInfo: string;
}

const initialState: FormState = {
  phone: "",
  apartmentNumber: "",
  entranceAndDoorNumber: "",
  additionalInfo: "",
};

const formSlice = createSlice({
  name: "deliveryform",
  initialState,
  reducers: {
    setFormValues(state, action: PayloadAction<FormState>) {
      return { ...state, ...action.payload };
    },
    resetFormValues(state) {
      return initialState;
    },
  },
});

export const { setFormValues, resetFormValues } = formSlice.actions;
export default formSlice.reducer;
