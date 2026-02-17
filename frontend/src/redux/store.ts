import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import sampleReducer from "./features/slices/sample";

// import navbarReducer from "./features/slices/navbar/navbar-slice";
// import { dashboardApi } from "@/redux/features/api-slices/dashboard/dashboard-api-slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["dashboard"],
};

const rootReducer = combineReducers({
  sample: sampleReducer,
  //   navbar: navbarReducer,
  //   [dashboardApi.reducerPath]: dashboardApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware({
  //       serializableCheck: {
  //         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //       },
  //     }).concat(dashboardApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
