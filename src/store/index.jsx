import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { AccountApi } from "./api/AccountApi";
import { ProductApi } from "./api/ProductApi";

const rootsReducer = combineReducers({
  [AccountApi.reducerPath]: AccountApi.reducer,
  [ProductApi.reducerPath]: ProductApi.reducer,
});

const middlewares = [AccountApi.middleware, ProductApi.middleware];

export const store = configureStore({
  reducer: rootsReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});

setupListeners(store.dispatch);
