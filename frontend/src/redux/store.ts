import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { flagOpsApi } from "./features/api-slices/base-query-setup";
import navbarReducer from "./features/slices/navbar";

const rootReducer = combineReducers({
  [flagOpsApi.reducerPath]: flagOpsApi.reducer,
  navbar: navbarReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(flagOpsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
