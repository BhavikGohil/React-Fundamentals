import api from "./api";
import type { Activity, ActivityFormValues } from "../types/activityTypes";

export const activityService = {
  getByCustomerId: async (customerId: string) => {
    const response = await api.get<Activity[]>(
      `/activities?customerId=${customerId}&_sort=createdAt&_order=desc`
    );

    return response.data;
  },

  create: async (customerId: string, values: ActivityFormValues) => {
    const response = await api.post<Activity>("/activities", {
      ...values,
      customerId,
      createdBy: "Admin",
      createdAt: new Date().toISOString(),
    });

    return response.data;
  },
};