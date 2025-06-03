import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import authReducer from "./auth/authSlice";
import productReducer from "./thunk/productSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});

const perisitedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    perisitedReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
