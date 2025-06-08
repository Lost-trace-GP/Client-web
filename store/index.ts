import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "../store/auth/authSlice";
import reportReducer from "../store/report/reportSlice"; // import your report slice reducer

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user"], // persist only token and user keys in auth state
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  report: reportReducer, // add report slice reducer here
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // add 'report' here if you want to persist report state as well
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
