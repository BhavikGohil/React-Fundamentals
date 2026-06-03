import type { Activity } from "./activityTypes";

export interface DashboardStats {
  totalCustomers: number;
  activeCustomers: number;
  inactiveCustomers: number;
  archivedCustomers: number;
  revenue: number;
  customerGrowth: number;
  unreadNotifications: number;
}

export interface DashboardState {
  stats: DashboardStats | null;
  recentActivities: Activity[];
  loading: boolean;
  error: string | null;
}