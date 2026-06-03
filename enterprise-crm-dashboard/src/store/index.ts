import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import customerReducer from "./customer/customerSlice";
import contactReducer from "./contact/contactSlice";
import activityReducer from "./activity/activitySlice";
import notificationReducer from "./notification/notificationSlice";
import auditLogReducer from "./auditLog/auditLogSlice";
import dashboardReducer from "./dashboard/dashboardSlice";
import themeReducer from "./theme/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    contact: contactReducer,
    activity: activityReducer,
    notification: notificationReducer,
    auditLog: auditLogReducer,
    dashboard: dashboardReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;