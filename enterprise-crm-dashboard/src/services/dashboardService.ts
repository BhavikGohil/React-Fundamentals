import type { DashboardStats } from "../types/dashboardTypes";
import { supabase } from "./supabaseClient";
import { mapActivity, mapCustomer, mapNotification } from "./supabaseMappers";

const throwIfError = (error: unknown) => {
  if (error) throw (error as { message: string }).message;
};

export const dashboardService = {
  getStats: async () => {
    const [customersResponse, notificationsResponse] = await Promise.all([
      supabase.from("customers").select("*"),
      supabase.from("notifications").select("*"),
    ]);

    throwIfError(customersResponse.error);
    throwIfError(notificationsResponse.error);

    const customers = (customersResponse.data || []).map(mapCustomer);
    const notifications = (notificationsResponse.data || []).map(mapNotification);

    const stats: DashboardStats = {
      totalCustomers: customers.filter((c) => !c.isArchived).length,
      activeCustomers: customers.filter((c) => !c.isArchived && c.status === "active").length,
      inactiveCustomers: customers.filter((c) => !c.isArchived && c.status === "inactive").length,
      archivedCustomers: customers.filter((c) => c.isArchived).length,
      revenue: customers.reduce((total, c) => total + Number(c.revenue || 0), 0),
      customerGrowth: customers.length,
      unreadNotifications: notifications.filter((n) => !n.isRead).length,
    };

    return stats;
  },

  getRecentActivities: async () => {
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    throwIfError(error);
    return (data || []).map(mapActivity);
  },
};