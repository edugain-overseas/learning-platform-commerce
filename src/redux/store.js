import { configureStore } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
// import {
//   persistReducer,
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";

// const persistConfig = {
//   key: "persisted-user",
//   storage,
//   whitelist: ["token", "userName", "userId", "userType"],
// };

// const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

export const store = configureStore({
  reducer: {

  },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
});

// export const persistor = persistStore(store);
