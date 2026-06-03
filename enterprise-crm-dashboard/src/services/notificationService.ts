import api from "./api";
import type { AppNotification } from "../types/notificationTypes";

export const notificationService = {
  getAll: async () => {
    const response = await api.get<AppNotification[]>("/notifications");

    return response.data.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  markAsRead: async (notification: AppNotification) => {
    const response = await api.patch<AppNotification>(
      `/notifications/${notification.id}`,
      {
        isRead: true,
      }
    );

    return response.data;
  },

  markAllAsRead: async (notifications: AppNotification[]) => {
    const unreadNotifications = notifications.filter(
      (notification) => !notification.isRead
    );

    await Promise.all(
      unreadNotifications.map((notification) =>
        api.patch(`/notifications/${notification.id}`, {
          isRead: true,
        })
      )
    );

    return unreadNotifications.map((notification) => notification.id);
  },
};