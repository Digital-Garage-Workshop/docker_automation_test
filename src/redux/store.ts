import {configureStore, combineReducers} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Default: localStorage for web
import {userReducer} from "./slices/userSlice";
import carReducer from "./slices/carSlice";
import mainSearchReducer from "./slices/mainSearchSlice";
import selectedCategoryReducer from "./slices/selectedCategorySlice";
import cartReducer from "./slices/cartSlice";
import {mapReducer} from "./slices/googleMapsSlice";
import orderReducer from "./slices/orderDataSlice";
import paymentReducer from "./slices/paymentSlice";
import shippingMethodReducer from "./slices/shippingMethodSlice";
import profileReducer from "./slices/profileSlice";
import breadcrumbReducer from "./slices/breadcrumbSlice";
import viewedProductReducer from "./slices/viewedProductSlice";
import selectedProductReducer from "./slices/selectedProductSlice";
import carHistoryRedudcer from "./slices/carHistory";
import filterReducer from "./slices/filterSlice";
import mainCateReducer from "./slices/mainCateSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "car",
    "cart",
    "user",
    "isMainSearchChanged",
    "selectedCategory",
    "selectedProduct",
    "shippingMethod",
    "mainSearch",
    "profile",
    "viewedProduct",
    "order",
    "carHistory",
    "maincate",
    "payment",
  ],
  blacklist: ["breadcrumbs", "map", "filter"],
  // whitelist: ['cart', 'user','car', 'mainSearch', 'selectedCategory', 'map','order','profile','payment','shippingMethod'],
};

const rootReducer = combineReducers({
  user: userReducer,
  car: carReducer,
  mainSearch: mainSearchReducer,
  selectedCategory: selectedCategoryReducer,
  cart: cartReducer,
  map: mapReducer,
  order: orderReducer,
  payment: paymentReducer,
  shippingMethod: shippingMethodReducer,
  viewedProduct: viewedProductReducer,
  profile: profileReducer,
  breadcrumbs: breadcrumbReducer,
  selectedProduct: selectedProductReducer,
  carHistory: carHistoryRedudcer,
  filter: filterReducer,
  maincate: mainCateReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      //  {
      //   // Ignore redux-persist actions
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
