import { createSlice } from "@reduxjs/toolkit";
import type { NotificationState } from "../../types/notificationTypes";
import {
  createNotification,
  fetchNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "./notificationThunk";

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    clearNotifications: (state) => {
      state.notifications = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNotification.fulfilled, (state, action) => {
        state.notifications.unshift(action.payload);
      })
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const index = state.notifications.findIndex(
          (notification) => notification.id === action.payload.id,
        );

        if (index !== -1) {
          state.notifications[index] = action.payload;
        }
      })

      .addCase(markAllNotificationsAsRead.fulfilled, (state, action) => {
        state.notifications = state.notifications.map((notification) =>
          action.payload.includes(notification.id)
            ? { ...notification, isRead: true }
            : notification,
        );
      });
  },
});

export const { clearNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;
