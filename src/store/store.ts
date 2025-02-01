import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  createMigrate,
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  MigrationManifest,
} from "redux-persist";
import { apiSlice, authenticationSlice } from "./slices";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { Logger } from "@/utils/libs";
import localforage from "localforage";

const migrations: MigrationManifest = {
  0: (state) => state,
};

localforage.config({
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
});

const persistConfig = {
  key: "fast-wash-africa-admin-root",
  migrate: createMigrate(migrations),
  stateReconciler: autoMergeLevel2,
  storage: localforage,
  // storage: storage,
  storeName: "fast-wash-africa-admin-store",
  timeout: 0,
  //  blacklist: ["api-slice"],
  transforms: [
    encryptTransform({
      onError(error) {
        Logger("Store Error", { error });
      },
      secretKey: "",
    }),
  ],
  version: 0,
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [authenticationSlice.reducerPath]: authenticationSlice.reducer,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const persistedReducer = persistReducer<RootState, any>(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: !import.meta.env.PROD,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

// Types for use in the app
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
