import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice.js";

export const store = configureStore({
  reducer: {
    auth: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
