import { configureStore } from "@reduxjs/toolkit";
import { flagOpsApi } from "./features/api-slices/base-query-setup";

export const store = configureStore({
  reducer: {
    [flagOpsApi.reducerPath]: flagOpsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(flagOpsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
