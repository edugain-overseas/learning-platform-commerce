import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/slice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import categorySlice from "./category/slice";
import courseSlice from "./course/slice";
import lessonSlice from "./lesson/slice";
import instructionSlice from "./instruction/slice";
import templateSlice from "./template/slice";

const persistConfig = {
  key: "persisted-user",
  storage,
  whitelist: ["accessToken", "userType"],
};

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    category: categorySlice.reducer,
    course: courseSlice.reducer,
    lesson: lessonSlice.reducer,
    instruction: instructionSlice.reducer,
    template: templateSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
