import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { flagOpsApi } from "./features/api-slices/base-query-setup";
// import userReducer from "./features/slices/userSlice";

const rootReducer = combineReducers({
  [flagOpsApi.reducerPath]: flagOpsApi.reducer,
  // user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(flagOpsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
