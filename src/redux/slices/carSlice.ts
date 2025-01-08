// carSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const carSlice = createSlice({
  name: "car",
  initialState: {
    brandId: "",
    brandName: "",
    modelId: "",
    modelName: "",
    carId: "",
    carName: "",
    plate: "",
    vin: "",
    searchedBy: 0,
    isCarCompShow: false,
    isChanged:false
  },
  reducers: {
    setCarDetails: (state, action) => {
      state.brandId = action.payload.brandId || state.brandId;
      state.brandName = action.payload.brandName || state.brandName;
      state.modelId = action.payload.modelId || state.modelId;
      state.modelName = action.payload.modelName || state.modelName;
      state.carId = action.payload.carId || state.carId;
      state.carName = action.payload.carName || state.carName;
      state.plate = action.payload.plate || state.plate;
      state.vin = action.payload.vin || state.vin;
      state.searchedBy = action.payload.searchedBy || state.searchedBy;
    },

    setCarCompShow: (state, action) => {
      state.isCarCompShow = action.payload;
    },

    resetCarDetails: (state) => {
      state.brandId = "";
      state.brandName = "";
      state.modelId = "";
      state.modelName = "";
      state.carId = "";
      state.carName = "";
      state.plate = "";
      state.vin = "";
      state.searchedBy = 0;
    },

  setChanged:(state)=>{
    state.isChanged = !state.isChanged
  }
  },

});

export const { setCarDetails, resetCarDetails, setCarCompShow,setChanged } =
  carSlice.actions;

// Configure persistence for this slice

export default carSlice.reducer;
