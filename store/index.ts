import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import authReducer from "../store/auth/authSlice";

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

// Persist config for the auth slice
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user"], // Persist only token and user
};

// Persist config for the root reducer
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Persist the auth reducer
};

// Apply persistReducer to the auth reducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Create the persisted root reducer
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor };
