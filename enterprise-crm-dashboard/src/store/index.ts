import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import customerReducer from "./customer/customerSlice";
import themeReducer from "./theme/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;