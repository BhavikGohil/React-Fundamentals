import { createAsyncThunk } from "@reduxjs/toolkit";
import { notificationService } from "../../services/notificationService";
import type { AppNotification } from "../../types/notificationTypes";

export const fetchNotifications = createAsyncThunk(
  "notification/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      return await notificationService.getAll();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createNotification = createAsyncThunk(
  "notification/createNotification",
  async (
    notification: Omit<AppNotification, "id" | "createdAt">,
    { rejectWithValue }
  ) => {
    try {
      return await notificationService.create(notification);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  "notification/markNotificationAsRead",
  async (notification: AppNotification, { rejectWithValue }) => {
    try {
      return await notificationService.markAsRead(notification);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const markAllNotificationsAsRead = createAsyncThunk(
  "notification/markAllNotificationsAsRead",
  async (notifications: AppNotification[], { rejectWithValue }) => {
    try {
      return await notificationService.markAllAsRead(notifications);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);