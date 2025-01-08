import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CarHistoryType {
  brandId: string;
  brandName: string;
  modelId: string;
  modelName: string;
  carId: string;
  carName: string;
  plate: string;
}

interface CarHistoryState {
  cars: CarHistoryType[];
}

const initialState: CarHistoryState = {
  cars: [],
};

const carHistorySlice = createSlice({
  name: "carHistory",
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<CarHistoryType>) => {
      const carExists = state.cars.some(
        (car) => car.carId === action.payload.carId
      );

      if (!carExists) {
        if (state.cars.length >= 3) {
          state.cars.shift();
        }
        state.cars.push(action.payload);
      }
    },
    clearCars: (state) => {
      state.cars = [];
    },
  },
});

export const { setCars, clearCars } = carHistorySlice.actions;
export default carHistorySlice.reducer;
