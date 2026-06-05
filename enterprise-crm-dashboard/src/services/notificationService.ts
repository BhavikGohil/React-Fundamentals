import type { AppNotification } from "../types/notificationTypes";
import { supabase } from "./supabaseClient";
import { mapNotification } from "./supabaseMappers";

const throwIfError = (error: unknown) => {
  if (error) throw (error as { message: string }).message;
};

export const notificationService = {
  getAll: async () => {
    const { data, error } = await supabase.from("notifications").select("*").order("created_at", { ascending: false });
    throwIfError(error);
    return (data || []).map(mapNotification);
  },

  create: async (notification: Omit<AppNotification, "id" | "createdAt">) => {
    const { data, error } = await supabase
      .from("notifications")
      .insert({ title: notification.title, message: notification.message, is_read: notification.isRead })
      .select()
      .single();

    throwIfError(error);
    return mapNotification(data);
  },

  markAsRead: async (notification: AppNotification) => {
    const { data, error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", notification.id)
      .select()
      .single();

    throwIfError(error);
    return mapNotification(data);
  },

  markAllAsRead: async (notifications: AppNotification[]) => {
    const ids = notifications.filter((n) => !n.isRead).map((n) => n.id);
    if (ids.length === 0) return [];

    const { error } = await supabase.from("notifications").update({ is_read: true }).in("id", ids);
    throwIfError(error);
    return ids;
  },
};