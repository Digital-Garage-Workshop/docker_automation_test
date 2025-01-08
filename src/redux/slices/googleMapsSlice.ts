// mapSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MapState {
  map: google.maps.Map | null;
  markerPosition: { lat: number; lng: number };
  address: string;
  zipcode: string;  // Add zipcode here
  geocoder: google.maps.Geocoder | null;
}

const initialState: MapState = {
  map: null,
  markerPosition: { lat: 47.918873, lng: 106.917517 },
  address: '',
  zipcode: '', // Initialize zipcode as an empty string
  geocoder: null,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMap(state, action: PayloadAction<google.maps.Map | null>) {
      state.map = action.payload;
    },
    setMarkerPosition(state, action: PayloadAction<{ lat: number; lng: number }>) {
      state.markerPosition = action.payload;
    },
    setAddress(state, action: PayloadAction<string>) {
      state.address = action.payload;
    },
    setZipcode(state, action: PayloadAction<string>) {  // Add setZipcode action
      state.zipcode = action.payload;
    },
    setGeocoder(state, action: PayloadAction<google.maps.Geocoder | null>) {
      state.geocoder = action.payload;
    },
  },
});

export const { setMap, setMarkerPosition, setAddress, setZipcode, setGeocoder } = mapSlice.actions;

export default mapSlice.reducer;
export const mapReducer = mapSlice.reducer;