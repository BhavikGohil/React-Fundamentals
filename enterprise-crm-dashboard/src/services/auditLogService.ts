import api from "./api";
import type { AuditLog } from "../types/auditLogTypes";

export const auditLogService = {
  getAll: async () => {
    const response = await api.get<AuditLog[]>(
      "/auditLogs?_sort=createdAt&_order=desc"
    );

    return response.data;
  },

  create: async (log: Omit<AuditLog, "id" | "createdAt" | "createdBy">) => {
    const response = await api.post<AuditLog>("/auditLogs", {
      ...log,
      createdBy: "Admin",
      createdAt: new Date().toISOString(),
    });

    return response.data;
  },
};