import { configureStore, AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";

import citiesReducer from "./cities";
export const store = configureStore({
  reducer: {
    cities: citiesReducer,
  },
  middleware: [thunkMiddleware] as const,
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;