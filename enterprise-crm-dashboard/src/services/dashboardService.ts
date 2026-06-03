import type { Activity } from "../types/activityTypes";
import type { Customer } from "../types/customerTypes";
import type { DashboardStats } from "../types/dashboardTypes";
import type { AppNotification } from "../types/notificationTypes";
import api from "./api";

export const dashboardService = {
  getStats: async () => {
    const [customersResponse, notificationsResponse] = await Promise.all([
      api.get<Customer[]>("/customers"),
      api.get<AppNotification[]>("/notifications"),
    ]);

    const customers = customersResponse.data;
    const notifications = notificationsResponse.data;

    const activeCustomers = customers.filter(
      (customer) => !customer.isArchived && customer.status === "active"
    );

    const inactiveCustomers = customers.filter(
      (customer) => !customer.isArchived && customer.status === "inactive"
    );

    const archivedCustomers = customers.filter(
      (customer) => customer.isArchived
    );

    const stats: DashboardStats = {
      totalCustomers: customers.filter((customer) => !customer.isArchived)
        .length,
      activeCustomers: activeCustomers.length,
      inactiveCustomers: inactiveCustomers.length,
      archivedCustomers: archivedCustomers.length,
      revenue: customers.reduce(
        (total, customer) => total + Number(customer.revenue || 0),
        0
      ),
      customerGrowth: customers.length,
      unreadNotifications: notifications.filter(
        (notification) => !notification.isRead
      ).length,
    };

    return stats;
  },

  getRecentActivities: async () => {
    const response = await api.get<Activity[]>("/activities");

    return response.data
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
  },
};