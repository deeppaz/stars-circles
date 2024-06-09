import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { AccountApi } from "./api/AccountApi";

const rootsReducer = combineReducers({
  [AccountApi.reducerPath]: AccountApi.reducer,
});

const middlewares = [AccountApi.middleware];

export const store = configureStore({
  reducer: rootsReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});

setupListeners(store.dispatch);
